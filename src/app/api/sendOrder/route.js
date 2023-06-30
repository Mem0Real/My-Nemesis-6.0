import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const res = await request.json();

  let firstName = res.user.fullname;
  firstName = firstName.split(" ")[0];

  let data = await res.productData.map((item) => ({
    productId: item.data.id,
    productName: item.data.name,
    orderedQuantity: item.data.quantity,
    productPrice: parseFloat(item.data.price),
    customerid: item.data.customerid,
  }));

  const res1 = prisma.customers.upsert({
    where: {
      id: firstName,
    },
    update: {
      totalPurchase: res.orderTotalPrice,
    },
    create: {
      id: firstName,
      name: res.user.fullname,
      phone: parseInt(res.user.phone),
      totalPurchase: res.orderTotalPrice,
    },
  });

  const res2 = prisma.order.createMany({
    data,
  });
  //   console.log(res);
  console.log(data);

  const result = await Promise.all([res1, res2]);

  return new NextResponse(JSON.stringify(result));
}
