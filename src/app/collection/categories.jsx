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
        className="flex flex-col items-center md:items-start text-sm mb-1 w-full bg-neutral-200/80 text-neutral-800"
      >
        <Link href={`/collection/${category.id}`} className="flex-none">
          <h1 className="md:ml-12 text-lg my-5 sm:my-9 ring ring-neutral-600 bg-neutral-100 ring-offset-4 hover:ring-offset-2 hover:ring-neutral-800 ring-opacity-40 shadow-lg shadow-neutral-800 px-5 rounded-md">
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
            <Parents categoryId={category.id} parents={category.parents} />
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
