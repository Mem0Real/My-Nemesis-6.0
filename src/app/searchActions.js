import prisma from "@/prisma";
import { revalidatePath, revalidateTag } from "next/cache";

export async function getOne(entry, id) {
  "use server";

  const data = await prisma[entry].findUnique({
    where: { id: id },
  });
  return data;
}
export async function search(query) {
  "use server";

  const categories = prisma.categories.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          id: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  const parents = prisma.parents.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          id: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  const children = prisma.children.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          id: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  const items = prisma.items.findMany({
    where: {
      OR: [
        {
          id: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          brand: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          model: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  const data = await Promise.all([categories, parents, children, items]);
  return data;
}
