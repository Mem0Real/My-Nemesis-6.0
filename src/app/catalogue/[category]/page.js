import Link from "next/link";
import { Suspense } from "react";

import Category from "./Category";
import CategoryLoader from "../components/(loader)/CategoryLoader";

export async function generateMetadata({ params: { category } }) {
  let firstLetter = category[0];
  firstLetter = firstLetter.toUpperCase();
  let categoryName = firstLetter + category.slice(1);

  return {
    title: `Nemesis - ${categoryName}`,
  };
}

export default async function CategoryPage({ params: { category } }) {
  const content = (
    <div className="flex flex-col justify-between items-center text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 pt-6 w-screen min-h-screen relative">
      <Suspense fallback={<CategoryLoader />}>
        <Category categoryId={category} />
      </Suspense>
      <Link
        href={`/catalogue/`}
        className="absolute top-16 right-0 md:right-12 bg-transparent rounded-md px-4 py-2 text-neutral-800 dark:text-neutral-200 hover:outline outline-1 outline-neutral-800 dark:outline-neutral-200"
      >
        Back
      </Link>
    </div>
  );

  return <div className="relative flex flex-col items-center">{content}</div>;
}
