import prisma from "./prisma";

import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error(
    "please provide process.env.NEXTAUTH_SECRET environment variable"
  );
}

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Empty email or password.");
        }

        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("User does not exist.");
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) throw new Error("Wrong password");

        return {
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
  },
};
