"use server";

import prisma from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";

export async function getOne(entry, id) {
  const data = await prisma[entry].findUnique({
    where: { id: id },
    select: { id: true },
  });
  return data;
}

export async function getAll() {
  const categories = prisma.categories.findMany({});

  const parents = prisma.parents.findMany({});

  const children = prisma.children.findMany({});

  const items = prisma.items.findMany({});

  const data = await Promise.all([categories, parents, children, items]);

  return data;
}

export async function search(query) {
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

export async function getEntry(entry, id) {
  let res1, res2, res3, data1, data2, data3;

  res1 = await prisma[entry].findUnique({
    where: { id: id },
  });

  data1 = JSON.stringify(res1);

  // console.log(res1);
  //   if(entry === "parents") {

  //     res2 = await prisma.categories.findUnique({
  //       where: {}
  //     })
  //   }
  // return data;
}
