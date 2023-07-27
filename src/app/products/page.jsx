import prisma from "@/lib/prisma";
import { toast } from "react-hot-toast";
import ProductList from "./productList";
// import { getProducts } from "./productActions";

async function getData(searchParams) {
  const search = searchParams.search || undefined;

  if (search) {
    try {
      const categories = prisma.categories.findMany({
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
      return categories;
    } catch (error) {
      return { error: "Error fetching data. \n Please try again later." };
    }
  } else {
    try {
      const categories = prisma.categories.findMany({
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
  const data = await getData(searchParams);
  // const productData = getProducts(searchParams);

  // const [data, products] = await Promise.all([allData, productData]);

  // console.log(products);
  if (data.error) return data.error;

  return <ProductList data={data} />;
}
