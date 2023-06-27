import Parents from "../parents";
import { Suspense } from "react";
import Link from "next/link";
import { getDetail, getParams } from "../lib/fetchFunctions";

export async function generateMetadata({ params: { category } }) {
  let firstLetter = category[0];
  firstLetter = firstLetter.toUpperCase();
  let categoryName = firstLetter + category.slice(1);

  return {
    title: `Nemesis - ${categoryName}`,
  };
}

export default async function Category({ params: { category } }) {
  const categoryData = await getDetail("categories", category);

  const content = (
    <div
      key={categoryData.id}
      className="flex flex-col justify-between items-center text-sm mb-1 w-screen bg-neutral-100 text-neutral-900 h-fit"
    >
      <div className="flex justify-end items-end w-full p-4">
        <Link href={`/collection/`}>
          <h2 className="px-2 py-1 md:top-24 md:right-12 md:px-4 md:py-2 bg-neutral-900 text-white rounded-lg">
            Go Back
          </h2>
        </Link>
      </div>
      <h1 className="flex-none text-lg md:mb-12 border border-x-0 border-3 rounded-md border-black md:px-6 md:py-2">
        {categoryData.name}
      </h1>
      <p className="h-24 text-center mt-4 md:mt-2">
        {categoryData.description}
      </p>
      <div className="flex-initial min-h-screen w-full">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Parents categoryId={category} />
        </Suspense>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col justify-evenly items-center w-screen mt-12">
      {content}
    </div>
  );
}

export async function generateStaticParams({ params: { category } }) {
  const categories = await getParams("categories");
  return categories.map((category) => ({
    category: category.id.toString(),
  }));
}
