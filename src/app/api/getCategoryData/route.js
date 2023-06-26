import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const entry = searchParams.get("entry");
  const names = await prisma[entry].findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      parents: {
        orderBy: {
          id: "asc",
        },
      },
    },
  });
  return NextResponse.json(names);
}
