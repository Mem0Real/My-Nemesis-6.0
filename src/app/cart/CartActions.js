"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function sendOrder(user, cartList, orderTotalPrice) {
  let firstName = user.fullname;
  firstName = firstName.split(" ")[0];
  firstName = firstName.toLowerCase();

  let dateNow = new Date().toISOString();

  let res1;
  let errorData = [];

  let data = await cartList.map((item) => ({
    productId: item.id,
    productName: item.name,
    productPrice: parseFloat(item.totalPrice),
    orderedQuantity: parseInt(item.amount),
    customerId: firstName,
  }));

  let tran = cartList.map((item) => ({
    productId: item.id,
    orderedQuantity: item.amount,
    productQuantity: item.quantity,
    remainingQuantity: item.quantity - item.amount,
  }));

  // TODO should update the quantity of purchased goods if user selects same product with different amount and is not delivered
  const createCustomer = async () => {
    try {
      await prisma.customers.upsert({
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
      return { error: `Problem while creating customer: \n ${error}` };
    }
  };

  const createOrder = async () => {
    try {
      await prisma.orders.createMany({
        data,
      });
    } catch (error) {
      return { error: `Problem while creating order: \n ${error}` };
    }
  };
  const updateProduct = async () => {
    try {
      await prisma.$transaction(
        tran.map((product) =>
          prisma.items.update({
            where: { id: product.productId },
            data: { quantity: product.remainingQuantity },
          })
        )
      );
    } catch (error) {
      return { error: "Error updating product quantity: \n" + error };
    }
  };

  const customerError = await createCustomer();
  const orderError = await createOrder();
  const productError = await updateProduct();

  if (customerError || orderError || productError) {
    if (customerError) {
      errorData.push(customerError);
    }
    if (orderError) {
      errorData.push(orderError);
    }
    if (productError) {
      errorData.push(productError);
    }

    return { error: `Problem creating order: \n ${errorData.join}` };
  } else {
    revalidatePath("/collection");
    revalidatePath("/dashboard");

    return {
      success: "Cart Items Sent.",
    };
  }
}
