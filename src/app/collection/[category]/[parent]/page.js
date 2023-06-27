import Children from "./children";
import { Suspense } from "react";
import Link from "next/link";

import { getDetail } from "../../lib/fetchFunctions";
import Parent from "./parent";

export async function generateMetadata({ params: { parent } }) {
  let firstLetter = parent[0];
  firstLetter = firstLetter.toUpperCase();
  let parentName = firstLetter + parent.slice(1);

  return {
    title: `Nemesis - ${parentName}`,
  };
}

export default async function ParentData({ params: { parent, category } }) {
  let currentParent = parent;
  let currentCategory = category;

  const content = (
    <div className="flex flex-col justify-between items-center text-sm mb-1 w-screen bg-neutral-100 text-neutral-900 h-fit">
      <div className="flex justify-end items-end w-full p-4">
        <Link href={`/collection/${currentCategory}`}>
          <h2 className="px-2 py-1 md:top-24 md:right-12 md:px-4 md:py-2 bg-neutral-900 text-white rounded-lg">
            Go Back
          </h2>
        </Link>
      </div>
      <Suspense
        fallback={
          <h1 className="text-3xl mx-auto">Loading current parent...</h1>
        }
      >
        <Parent categoryId={currentCategory} parentId={currentParent} />
      </Suspense>
    </div>
  );

  return (
    <div className="flex flex-col justify-evenly items-center w-screen mt-12">
      {content}
    </div>
  );
}
