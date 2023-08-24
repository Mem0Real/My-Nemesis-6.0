"use server";
import { prisma } from "@/lib/prisma";
import SideBarComponent from "./SideBarComponent";

async function getData() {
  const categories = prisma.categories.findMany({ orderBy: { id: "asc" } });

  const parents = prisma.parents.findMany({ orderBy: { id: "asc" } });

  const children = prisma.children.findMany({ orderBy: { id: "asc" } });

  const items = prisma.items.findMany({ orderBy: { name: "asc" } });

  const data = await Promise.all([categories, parents, children, items]);

  return data;
}

export default async function SideBarBase() {
  const data = await getData();

  return (
    <div className="absolute left-0 top-16">
      <SideBarComponent data={data} />
    </div>
  );
}
