import Link from "next/link";
import { Suspense } from "react";
import Parents from "./Parents";
import { getCollectionData } from "./lib/fetchFunctions";

export default async function Categories() {
  const categories = await getCollectionData("categories");

  if (!categories[0].name) return notFound();

  const content = categories.map((category) => {
    return (
      <div
        key={category.id}
        className="flex flex-col items-center md:items-start text-sm mb-1 w-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
      >
        <Link href={`/collection/${category.id}`} className="flex-none">
          <h1 className="md:ml-12 text-lg my-5 sm:my-9 bg-neutral-100 dark:bg-neutral-900 ring ring-opacity-40 ring-neutral-600 ring-offset-2 dark:ring-neutral-800 hover:ring-offset-1 hover:ring-neutral-500 dark:hover:ring-neutral-700 shadow-lg shadow-neutral-800 hover:shadow-neutral-600 dark:shadow-neutral-900 dark:hover:shadow-neutral-950 px-5 rounded-sm">
            {category.name}
          </h1>
        </Link>
        <div className="w-full">
          <Suspense
            fallback={
              <h1 className="text-md text-center mx-auto">
                Loading parents...
              </h1>
            }
          >
            <div className="group mx-auto w-[95%] border border-neutral-300 rounded-3xl shadow-neutral-400 hover:shadow-neutral-600 dark:shadow-neutral-900 dark:hover:shadow-black dark:border-neutral-700">
              <Parents categoryId={category.id} parents={category.parents} />
            </div>
          </Suspense>
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col justify-evenly items-center w-screen">
      {content}
    </div>
  );
}
