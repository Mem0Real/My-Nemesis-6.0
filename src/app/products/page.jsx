import prisma from "@/lib/prisma";
import { toast } from "react-hot-toast";
import ProductList from "./productList";
// import { getProducts } from "./productActions";

async function getData(searchParams) {
  const search = searchParams.search || undefined;
  const sort = searchParams.sort || "asc";

  const filter = searchParams.filter || undefined;

  let limit, page, skip;

  if (filter || search) {
    limit = searchParams.limit * 1 || 5;
    page = searchParams.page * 1 || 1;
    skip = searchParams.skip * 1 || limit * (page - 1);
  } else {
    limit = searchParams.limit * 1 || 1;
    page = searchParams.page * 1 || 1;
    skip = searchParams.skip * 1 || page - 1;
  }

  let counter, totalPage;

  let searchCheck, filterCheck;
  if (search) {
    searchCheck = {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { id: { contains: search, mode: "insensitive" } },
      ],
    };
  } else {
    searchCheck = undefined;
  }

  filterCheck = filter ? { id: filter } : undefined;

  if (filter || search) {
    const count = await prisma.categories.findMany({
      where: filterCheck,
      select: {
        parents: {
          select: {
            children: {
              select: {
                _count: {
                  select: {
                    items: {
                      where: searchCheck,
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    let childArray = [];
    count[0].parents.map(
      (child) => (childArray = childArray.concat(child.children))
    );

    let itemArray = [];
    childArray.map((item) => (itemArray = itemArray.concat(item._count)));

    let prodArray = [];
    itemArray.map((prod) => (prodArray = prodArray.concat(prod.items)));

    counter = prodArray.reduce((acc, val) => acc + val);
    totalPage = Math.ceil(counter / limit);
  } else {
    let c1, c2, c3, c4;

    c1 = prisma.categories.count({});
    c2 = prisma.parents.count({});
    c3 = prisma.children.count({});
    c4 = prisma.items.count({});

    const count = await Promise.all([c1, c2, c3, c4]);
    counter = count.reduce((acc, val) => acc + val, 0);

    totalPage = Math.ceil(counter / limit);
  }

  try {
    const categories = await prisma.categories.findMany({
      orderBy: { id: sort },
      select: {
        id: true,
        parents: {
          orderBy: { id: sort },
          select: {
            id: true,
            children: {
              orderBy: { id: sort },
              select: {
                id: true,
                items: {
                  orderBy: { name: sort },
                  take: limit,
                  skip: skip,
                  where: searchCheck,
                },
              },
            },
          },
        },
      },
    });

    // const [categories, count] = await Promise.all([categoriesData, countData]);

    return { categories, counter, totalPage };
  } catch (error) {
    return { error: "Error fetching data. \n Please try again later." };
  }
}

export default async function ProductsPage({ params, searchParams }) {
  try {
    const { categories, totalPage } = await getData(searchParams);
    // console.log(categories, totalPage);
    return <ProductList data={categories} totalPage={totalPage} />;
  } catch (error) {
    console.log(error);
  }
}
