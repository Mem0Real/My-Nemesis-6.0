import prisma from "@/lib/prisma";
import { toast } from "react-hot-toast";
import ProductList from "./productList";

async function getMenuData() {
  let menu;
  try {
    menu = await prisma.categories.findMany({
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
              },
            },
          },
        },
      },
    });
    return menu;
  } catch (error) {
    return { error: "Error fetching data. \n Please try again later." };
  }
}

async function getProducts(searchParams) {
  const search = searchParams.search || undefined;
  const sort = searchParams.sort || "asc";

  const filter = searchParams.filter || undefined;
  let decodedFilter = decodeURIComponent(filter);
  let filterArray = decodedFilter.split(",");

  let check;

  // Conditions
  if (search && !filter) {
    check = {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { id: { contains: search, mode: "insensitive" } },
      ],
    };
  } else if (!search && filter) {
    check = { CategoryId: { in: filterArray } };
  } else if (search && filter) {
    check = {
      AND: [
        { CategoryId: { in: filterArray } },
        {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { id: { contains: search, mode: "insensitive" } },
          ],
        },
      ],
    };
  } else {
    check = undefined;
  }

  // Pagination
  let limit, page, skip, count, totalPage;
  limit = searchParams.limit * 1 || 5;
  page = searchParams.page * 1 || 1;
  skip = searchParams.skip * 1 || limit * (page - 1);

  // Count
  count = await prisma.items.count({
    where: check,
  });
  totalPage = Math.ceil(count / limit);

  // MainData
  try {
    const products = await prisma.items.findMany({
      where: check,
      orderBy: { name: sort },
      take: limit,
      skip: skip,
    });
    return { products, totalPage };
  } catch (error) {
    return {
      error: error || "Error fetching data. \n Please try again later.",
    };
  }
}
export default async function ProductsPage({ params, searchParams }) {
  try {
    const menu = await getMenuData();
    const { products, totalPage } = await getProducts(searchParams);
    return (
      <ProductList menu={menu} products={products} totalPage={totalPage} />
    );
  } catch (error) {
    throw new Error("Error fetching data! Please try again later.");
  }
}
