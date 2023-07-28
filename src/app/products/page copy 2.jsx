import prisma from "@/lib/prisma";
import { toast } from "react-hot-toast";
import ProductList from "./productList";
// import { getProducts } from "./productActions";

async function getData(searchParams) {
  const search = searchParams.search || undefined;
  const sort = searchParams.sort || "asc";

  const filter = searchParams.filter || undefined;

  let decodedFilter = decodeURIComponent(filter);

  let filterArray = decodedFilter.split(",");

  let limit, page, skip;

  if ((filter && !search) || (!filter && search)) {
    // filter && !search && console.log("limit nosearch");
    // search && !filter && console.log("nolimit search");
    limit = searchParams.limit * 1 || 2;
    page = searchParams.page * 1 || 1;
    skip = searchParams.skip * 1 || limit * (page - 1);
  } else if (filter && search) {
    // console.log("both limit & search");
    limit = searchParams.limit * 1 || 5;
    page = searchParams.page * 1 || 1;
    skip = searchParams.skip * 1 || limit * (page - 1);
  } else {
    // console.log("neither limit nor search");
    limit = searchParams.limit * 1 || 1;
    page = searchParams.page * 1 || 1;
    skip = searchParams.skip * 1 || page - 1;
  }

  let count, counter, totalPage, categories;

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

  if (filter) {
    filterCheck = { id: { in: filterArray } };
  } else filterCheck = undefined;
  // filterCheck = filter ? { id: filter } : undefined;

  // if (filter || search) {
  //   const categories = await prisma.categories.findMany({
  //     where: filterCheck,
  //     select: {
  //       parents: {
  //         select: {
  //           children: {
  //             select: {
  //               _count: {
  //                 select: {
  //                   items: {
  //                     where: searchCheck,
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });

  //   let childArray = [];
  //   categories[0].parents.map(
  //     (child) => (childArray = childArray.concat(child.children))
  //   );
  //   // console.log("parentCount: ", childArray);

  //   let itemArray = [];
  //   childArray.map((item) => (itemArray = itemArray.concat(item._count)));
  //   // console.log("childrenCount: ", itemArray);

  //   let prodArray = [];
  //   itemArray.map((prod) => (prodArray = prodArray.concat(prod.items)));
  //   // console.log("itemCount: ", prodArray);

  //   if (prodArray.length > 0) {
  //     counter = prodArray.reduce((acc, val) => acc + val);
  //     // console.log("Count: ", counter);
  //     totalPage = Math.ceil(counter / limit);
  //     // console.log("Total Page: ", totalPage);
  //   } else {
  //     totalPage = 0;
  //   }
  // } else {
  //   let c1, c2, c3, c4;

  //   c1 = prisma.categories.count({});
  //   c2 = prisma.parents.count({});
  //   c3 = prisma.children.count({});
  //   c4 = prisma.items.count({});

  //   const count = await Promise.all([c1, c2, c3, c4]);
  //   counter = count.reduce((acc, val) => acc + val, 0);

  //   totalPage = Math.ceil(counter / limit);
  // }

  // if (search) {

  // try {
  //   const counters = await prisma.categories.findMany({
  //     select: {
  //       parents: {
  //         select: {
  //           children: {
  //             select: {
  //               items: {
  //                 select: {
  //                   _count: true,
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });
  //   console.log(counters);
  // } catch (error) {
  //   console.log(error);
  // }

  if (search && !filter) {
    try {
      count = await prisma.categories.count({
        where: {
          parents: {
            some: {
              children: {
                some: {
                  items: {
                    some: {
                      name: { contains: search, mode: "insensitive" },
                    },
                  },
                },
              },
            },
          },
        },
      });
      totalPage = Math.ceil(count / limit);
    } catch (error) {
      console.log(error);
    }
  } else if (search && filter) {
    try {
      count = await prisma.categories.count({
        where: {
          AND: [
            {
              id: { in: filterArray },
            },
            {
              parents: {
                some: {
                  children: {
                    some: {
                      items: {
                        some: {
                          name: { contains: search, mode: "insensitive" },
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      });
      totalPage = Math.ceil(count / limit);
    } catch (error) {
      console.log(error);
    }
  } else if (filter && !search) {
    try {
      count = await prisma.categories.count({
        where: filterCheck,
      });
      totalPage = Math.ceil(count / limit);
    } catch (error) {
      console.log(error);
    }
  } else {
    let c1, c2, c3, c4;

    c1 = prisma.categories.count({});
    c2 = prisma.parents.count({});
    c3 = prisma.children.count({});
    c4 = prisma.items.count({});

    const res = await Promise.all([c1, c2, c3, c4]);
    count = res.reduce((acc, val) => acc + val, 0);

    totalPage = Math.ceil(count / limit);
  }

  // Main Data
  try {
    categories = await prisma.categories.findMany({
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
  } catch (error) {
    return { error: "Error fetching data. \n Please try again later." };
  }

  return { categories, count, totalPage };
}
// }

export default async function ProductsPage({ params, searchParams }) {
  try {
    // const data = await getData(searchParams);
    const { categories, totalPage } = await getData(searchParams);
    // console.log(categories, totalPage);
    return <ProductList data={categories} totalPage={totalPage} />;
  } catch (error) {
    console.log(error);
  }
}
