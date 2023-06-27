import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const entry = searchParams.get("entry");
  const id = searchParams.get("id");

  const res = await prisma[entry].findUnique({
    where: { id: id },
  });

  return NextResponse.json(res);
}
