"use server";

import prisma from "@/lib/prisma";

export async function fetchProducts() {
  const products = await prisma.items.findMany({
    where: {
      images: {
        isEmpty: false,
      },
    },
    select: {
      id: true,
      CategoryId: true,
      ParentId: true,
      ChildId: true,
      name: true,
      images: true,
      price: true,
    },
    take: 5,
  });

  return products;
}
