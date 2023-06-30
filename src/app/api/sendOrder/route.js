import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();

  console.log(data);
  console.log(data.productData);

  //   const res = await prisma.orders.createMany({
  //       data:
  //   })

  //   return new NextResponse.json(data);
}
