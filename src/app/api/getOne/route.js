import { NextResponse } from "next/server";

export async function GET(request) {
  const { entry, id } = await request.json();

  const data = await prisma[entry].findUnique({
    where: { id: id },
  });
  return new NextResponse(JSON.stringify(data));
}
