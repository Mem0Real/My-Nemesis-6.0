import prisma from "@/lib/prisma";
import { toast } from "react-hot-toast";
import ProductList from "./productList";

async function getData() {
  "use server";
  let categories, parents, children, products, data;
  try {
    categories = prisma.categories.findMany({ orderBy: { id: "asc" } });
    parents = prisma.parents.findMany({ orderBy: { id: "asc" } });
    children = prisma.children.findMany({ orderBy: { id: "asc" } });
    products = prisma.items.findMany({ orderBy: { id: "asc" } });

    data = await Promise.all([categories, parents, children, products]);
    return data;
  } catch (error) {
    return { error: "Error fetching data. \n Please try again later." };
  }
}

export default async function ProductsPage() {
  const data = await getData();
  if (data.error) toast.error(data.error);

  return <ProductList data={data} />;
}
