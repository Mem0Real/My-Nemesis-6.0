import { prisma } from "@/lib/prisma";

export default async function copyIds(id) {
  const res = await prisma.children.update({
    where: { id: id },
    data: { CategoryId: id },
  });
}
