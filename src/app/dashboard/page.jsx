import prisma from "@/lib/prisma";

import { create, update, deleteItem } from "./listActions";
import { removeOne, removeAll, markDelivered } from "./orderActions";

import AdminActions from "./AdminActions";

async function categoryList() {
  const categories = prisma.categories.findMany({ orderBy: { id: "asc" } });

  const parents = prisma.parents.findMany({ orderBy: { id: "asc" } });

  const children = prisma.children.findMany({ orderBy: { id: "asc" } });

  const items = prisma.items.findMany({ orderBy: { name: "asc" } });

  const data = await Promise.all([categories, parents, children, items]);

  return data;
}

async function orderList() {
  const customers = prisma.customers.findMany({
    orderBy: { createdAt: "asc" },
  });

  const orders = prisma.orders.findMany({
    orderBy: { productName: "asc" },
  });

  const data = await Promise.all([customers, orders]);

  return data;
}

export default async function DashboardPage() {
  let url;
  if (process.env.NODE_ENV === "development") url = process.env.LOCAL_URL;
  else url = process.env.PRODUCTION_URL;

  const listData = categoryList();
  const orderData = orderList();

  const data = await Promise.all([listData, orderData]);

  const list = data[0];
  const order = data[1];

  return (
    <div className="flex flex-col items-center gap-6 bg-neutral-200 text-neutral-800">
      <div className="flex items-center mt-7">
        <h1 className="text-4xl font-bold underline underline-offset-4 p-4">
          Admin
        </h1>
      </div>
      <AdminActions
        data={list}
        create={create}
        update={update}
        deleteItem={deleteItem}
        removeOne={removeOne}
        removeAll={removeAll}
        markDelivered={markDelivered}
        url={url}
        order={order}
      />
    </div>
  );
}
