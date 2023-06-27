import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const parents = await prisma.parents.findMany({
    select: {
      id: true,
      name: true,
      children: {
        orderBy: {
          id: "asc",
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  return NextResponse.json(parents);
}
