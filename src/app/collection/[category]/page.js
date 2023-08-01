import Link from "next/link";
import { Suspense } from "react";

import Category from "./category";

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
    <div className="flex flex-col justify-between items-center text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 pt-6 w-screen min-h-screen">
      <div className="flex justify-end items-end w-full p-4">
        <Link href={`/collection/`}>
          <h2 className="px-2 py-1 md:top-24 md:right-12 md:px-4 md:py-2 bg-neutral-900 text-white rounded-lg">
            Go Back
          </h2>
        </Link>
      </div>
      <Suspense
        fallback={
          <h1 className="text-3xl mx-auto">Loading current category</h1>
        }
      >
        <Category categoryId={category} />
      </Suspense>
    </div>
  );

  return <div className="flex flex-col items-center">{content}</div>;
}
