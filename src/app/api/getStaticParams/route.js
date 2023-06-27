import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const entry = searchParams.get("entry");

  const res = await prisma[entry].findMany({
    select: { id: true },
    orderBy: { id: "asc" },
  });

  return NextResponse.json(res);
}
