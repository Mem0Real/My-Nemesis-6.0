import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function insertAdmin() {
  "use server";
  const password = await hash("admin123", 12);
  const user = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      name: "Admin",
      password,
    },
  });
  console.log({ user });
}
