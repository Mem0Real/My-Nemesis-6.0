import React from "react";
import prisma from "@/lib/prisma";

import { create, update, deleteItem } from "./listActions";
import { removeOne, removeAll, markDelivered } from "./orderActions";

import AdminActions from "./AdminActions";
import copyIds from "../utils/copyIds";

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
async function copy(id, upId) {
  const res = await prisma.items.update({
    where: { id: id },
    data: { CategoryId: upId },
  });
}

export default async function DataFetcher() {
  const listData = categoryList();
  const orderData = orderList();

  const data = await Promise.all([listData, orderData]);

  const list = data[0];
  const order = data[1];

  const [categories, parents, children, items] = list;
  const editor = () => {
    parents.map((parent) => {
      // console.log("Parents: ", parent.id, parent.CategoryId);
      children.map(({ id, ParentId, CategoryId }) => {
        if (ParentId === parent.id) console.log(id, parent.CategoryId);
      });
    });
  };

  const editor2 = () => {
    children.map((child) => {
      // console.log("Children: ", child.id, child.CategoryId);
      items.map(({ id, name, ChildId, CategoryId }) => {
        if (ChildId === child.id) console.log(name, child.CategoryId);
      });
    });
  };

  editor2();
  return (
    <AdminActions
      data={list}
      create={create}
      update={update}
      deleteItem={deleteItem}
      removeOne={removeOne}
      removeAll={removeAll}
      markDelivered={markDelivered}
      order={order}
    />
  );
}
