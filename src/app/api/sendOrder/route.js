import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();

  console.log(data);

  // const res = await prisma.orders.create({
  //     data: {
  //         id: orderData.data.id,
  //         name: orderData
  //     }
  // })

  //   return new NextResponse.json(data);
}
