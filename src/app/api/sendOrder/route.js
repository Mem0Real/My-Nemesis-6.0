import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  const res = await request.json();

  let firstName = res.user.fullname;
  firstName = firstName.split(" ")[0];
  firstName = firstName.toLowerCase();

  let dateNow = new Date().toISOString();

  const res1 = await prisma.customers.upsert({
    where: {
      id: firstName,
    },
    update: {
      totalPurchase: res.orderTotalPrice,
      updatedAt: dateNow,
    },
    create: {
      id: firstName,
      name: res.user.fullname,
      phone: parseInt(res.user.phone),
      totalPurchase: res.orderTotalPrice,
      updatedAt: dateNow,
    },
  });

  if (!res1) throw new Error("Error creating order");

  let data = await res.cartList.map((item) => ({
    productId: item.id,
    productName: item.name,
    productPrice: parseFloat(item.totalPrice),
    orderedQuantity: parseInt(item.amount),
    customerId: firstName,
  }));

  const res2 = await prisma.order.createMany({
    data,
  });

  if (!res2) throw new Error("Error creating order");

  let tran = await res.cartList.map((item) => ({
    productId: item.id,
    orderedQuantity: item.amount,
    productQuantity: item.quantity,
    remainingQuantity: item.quantity - item.amount,
  }));

  const transaction = await prisma.$transaction(
    tran.map((product) =>
      prisma.items.update({
        where: { id: product.productId },
        data: { quantity: product.remainingQuantity },
      })
    )
  );

  revalidatePath("/collection");
  return new NextResponse(JSON.stringify(transaction, res1, res2));
}
