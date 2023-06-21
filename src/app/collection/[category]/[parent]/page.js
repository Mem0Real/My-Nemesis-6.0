import Children from "./Children";
import { Suspense } from "react";
import Link from "next/link";

import { getEntry } from "@/app/collection/actions";

export async function generateMetadata({ params: { parent } }) {
  let firstLetter = parent[0];
  firstLetter = firstLetter.toUpperCase();
  let parentName = firstLetter + parent.slice(1);

  return {
    title: `Nemesis - ${parentName}`,
  };
}

export default async function Parent({ params: { parent, category } }) {
  let currentParent = parent;
  let currentCategory = category;
  const parentData = await getEntry("parents", currentParent);

  const content = (
    <div
      key={parentData.id}
      className="flex flex-col justify-between items-center text-sm mb-1 w-screen bg-neutral-100 text-neutral-900 h-fit"
    >
      <div className="flex justify-end items-end w-full p-4">
        <Link href={`/collection/${currentCategory}`}>
          <h2 className="px-2 py-1 md:top-24 md:right-12 md:px-4 md:py-2 bg-neutral-900 text-white rounded-lg">
            Go Back
          </h2>
        </Link>
      </div>
      <h1 className="flex-none text-lg md:mb-12 border border-x-0 border-3 rounded-md border-black md:px-6 md:py-2">
        {parentData.name}
      </h1>
      <p className="h-24 text-center mt-4 md:mt-2">{parentData.description}</p>
      <div className="flex-initial min-h-screen w-full">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Children ParentId={currentParent} CategoryId={currentCategory} />
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
