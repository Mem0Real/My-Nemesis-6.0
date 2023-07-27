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
    skip = searchParams.skip * 1 || page * (page - 1);
  } else {
    limit = searchParams.limit * 1 || 1;
    page = searchParams.page * 1 || 1;
    skip = searchParams.skip * 1 || page - 1;
  }

  let c1, c2, c3, c4;

  c1 = prisma.categories.count({});
  c2 = prisma.parents.count({});
  c3 = prisma.children.count({});
  c4 = prisma.items.count({});

  const count = await Promise.all([c1, c2, c3, c4]);
  const totalCount = count.reduce((acc, val) => acc + val, 0);

  const totalPage = Math.ceil(totalCount / limit);

  if (search) {
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
                    where: {
                      OR: [
                        { name: { contains: search, mode: "insensitive" } },
                        { id: { contains: search, mode: "insensitive" } },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      });

      return { categories, totalCount, totalPage };
    } catch (error) {
      return { error: "Error fetching data. \n Please try again later." };
    }
  } else {
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
                    take: limit,
                    skip: skip,
                    orderBy: { name: sort },
                  },
                },
              },
            },
          },
        },
      });

      return { categories, totalCount, totalPage };

      // const counter = await prisma.categories.count({
      //   where: {},
      //   select: {
      //     id: true,
      //     parents: {
      //       select: {
      //         id: true,
      //         children: {
      //           select: {
      //             id: true,
      //             items: {
      //               take: limit,
      //               skip: skip,
      //             },
      //           },
      //         },
      //       },
      //     },
      //   },
      // });
    } catch (error) {
      return { error: "Error fetching data. \n Please try again later." };
    }
  }
}

// async function getProducts(searchParams) {
//   const search = searchParams.search || undefined;

//   try {
//     // const res = await prisma.items.findMany({
//     //   where: {
//     //     name: {
//     //       search: search,
//     //     },
//     //   },
//     // });
//     const res = await prisma.items.findMany({
//       where: {
//         OR: [
//           { name: { contains: search, mode: "insensitive" } },
//           { id: { contains: search, mode: "insensitive" } },
//         ],
//       },
//     });
//     return res;
//   } catch (error) {
//     return { error: error };
//   }
// }

export default async function ProductsPage({ params, searchParams }) {
  try {
    const { categories, totalPage } = await getData(searchParams);
    return <ProductList data={categories} totalPage={totalPage} />;
  } catch (error) {
    console.log(error);
  }
}
