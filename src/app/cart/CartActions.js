"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function sendOrder(user, cartList, orderTotalPrice) {
  let firstName = user.fullname;
  firstName = firstName.split(" ")[0];
  firstName = firstName.toLowerCase();

  let dateNow = new Date().toISOString();

  let res1;

  try {
    res1 = await prisma.customers.upsert({
      where: {
        id: firstName,
      },
      update: {
        totalPurchase: orderTotalPrice,
        updatedAt: dateNow,
      },
      create: {
        id: firstName,
        name: user.fullname,
        phone: parseInt(user.phone),
        totalPurchase: orderTotalPrice,
        updatedAt: dateNow,
      },
    });
  } catch (error) {
    return { error: `Error creating order: ${error}` };
  }
  if (!res1) return { error: "Error creating order" };

  let data = await cartList.map((item) => ({
    productId: item.id,
    productName: item.name,
    productPrice: parseFloat(item.totalPrice),
    orderedQuantity: parseInt(item.amount),
    customerId: firstName,
  }));

  const res2 = await prisma.orders.createMany({
    data,
  });

  if (!res2) return { error: "Error creating order" };

  let tran = await cartList.map((item) => ({
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
  revalidatePath("/dashboard");
  return {
    success: "Cart Items Sent.",
    message: "One of our employees will reach out soon. \n Thank you!",
  };
}
