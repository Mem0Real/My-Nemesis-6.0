import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const entry = searchParams.get("entry");
  const includes = searchParams.get("include");
  const refId = searchParams.get("refId");

  if (includes === "") includes = undefined;

  const data = await prisma[entry].findMany({
    orderBy: {
      id: "asc",
    },
    select: {
      id: true,
      name: true,
      description: true,
      [includes]: {
        orderBy: {
          id: "asc",
        },
      },
    },
  });

  return NextResponse.json(data);
}
