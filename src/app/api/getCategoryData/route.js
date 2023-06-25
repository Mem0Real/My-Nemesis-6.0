import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const entry = searchParams.get("entry");
  const names = await prisma[entry].findMany({
    select: { id: true, name: true, parents: true },
  });
  return NextResponse.json(names);
}
