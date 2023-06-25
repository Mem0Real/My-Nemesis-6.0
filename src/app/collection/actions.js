import prisma from "@/lib/prisma";

export async function getEntries(entry, currentItem) {
  "use server";

  let includes;

  if (entry === "categories") includes = { parents: true };
  else if (entry === "parents") includes = { children: true };
  else if (entry === "children") includes = { items: true };

  const data = await prisma[entry].findMany({
    include: includes,
    where: currentItem,
  });
  return data;
}

export async function getEntry(entry, currentItem) {
  "use server";

  const data = await prisma[entry].findUnique({
    where: { id: currentItem },
  });
  return data;
}
