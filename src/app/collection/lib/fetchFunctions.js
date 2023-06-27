import prisma from "@/lib/prisma";

let url;
if (process.env.NODE_ENV === "development")
  url = process.env.NEXT_PUBLIC_LOCAL_URL;
else if (process.env.NODE_ENV === "production")
  url = process.env.NEXT_PUBLIC_BUILD_URL;

export async function getCollectionData(entry, id = null) {
  let include, option;

  if (entry === "categories") {
    include = "parents";
  } else if (entry === "parents") {
    include = "children";
    reference = { name: "CategoryId", val: id };
  } else if (entry === "children") {
    include = "items";
    reference = { name: "ParentId", val: id };
  } else {
    include = "";
    reference = { name: "ChildId", val: id };
  }

  let reference = { name: undefined, val: undefined };

  const res = await prisma[entry].findMany({
    orderBy: {
      id: "asc",
    },
    where: { [reference.name]: reference.val },
    select: {
      id: true,
      name: true,
      description: true,
      [include]: {
        orderBy: {
          id: "asc",
        },
      },
    },
  });
  return res;
}

export async function getDetail(entry, id) {
  const res = await prisma[entry].findUnique({
    where: { id: id },
  });
  return res;
}

export async function getParams(entry) {
  const res = await prisma[entry].findMany({
    select: { id: true },
    orderBy: { id: "asc" },
  });
  return res;
}