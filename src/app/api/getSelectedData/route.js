import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const entry = searchParams.get("entry");
  const id = searchParams.get("id");

  let refId;
  if (entry === "parents") refId = "CategoryId";
  else if (entry === "children") refId = "ParentId";
  else if (entry === "items") refId = "ChildId";

  const data = await prisma[entry].findMany({
    where: { [refId]: id },
  });

  return NextResponse.json(data);
}
