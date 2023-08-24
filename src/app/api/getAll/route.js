import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = prisma.categories.findMany({});

  const parents = prisma.parents.findMany({});

  const children = prisma.children.findMany({});

  const items = prisma.items.findMany({});

  const data = await Promise.all([categories, parents, children, items]);

  return NextResponse.json(data);
}
