import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
      parents: {
        orderBy: {
          id: "asc",
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  return NextResponse.json(categories);
}
