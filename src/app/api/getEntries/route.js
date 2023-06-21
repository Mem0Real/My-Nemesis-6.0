import prisma from "@/prisma";
import { NextResponse } from "next/server";

export default async function GET(request) {
  let includes;

  if (entry === "categories") includes = { parents: true };
  else if (entry === "parents") includes = { children: true };
  else if (entry === "children") includes = { items: true };

  const data = await prisma[entry].findMany({
    include: includes,
    where: id,
  });
  return new NextResponse(JSON.stringify(data));
}
