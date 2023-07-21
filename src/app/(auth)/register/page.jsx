import * as bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";
import RegisterForm from "./Form";

export default function RegisterPage() {
  async function createUser(name, email, password) {
    "use server";
    const data = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: await bcrypt.hash(password, 10),
      },
    });
    return data;
  }

  return <RegisterForm createUser={createUser} />;
}
