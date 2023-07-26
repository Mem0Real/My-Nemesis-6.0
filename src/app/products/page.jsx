import prisma from "@/lib/prisma";
import { toast } from "react-hot-toast";
import ProductList from "./productList";

async function getData() {
  "use server";
  let categories, parents, children, products, data;
  try {
    categories = prisma.categories.findMany({
      orderBy: { id: "asc" },
      select: {
        id: true,
        parents: {
          orderBy: { id: "asc" },
          select: {
            id: true,
            children: {
              orderBy: { id: "asc" },
              select: {
                id: true,
                items: {
                  orderBy: { name: "asc" },
                },
              },
            },
          },
        },
      },
    });
    return categories;
  } catch (error) {
    return { error: "Error fetching data. \n Please try again later." };
  }
}

export default async function ProductsPage() {
  const data = await getData();
  if (data.error) toast.error(data.error);

  return <ProductList data={data} />;
}
