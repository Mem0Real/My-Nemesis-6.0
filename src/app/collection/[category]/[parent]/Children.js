import Link from "next/link";
import { Suspense } from "react";

import { getCollectionData } from "@/app/collection/lib/fetchFunctions";
import Items from "./Items";

export default async function Children({ categoryId, parentId }) {
  let content;

  const reference = { ParentId: parentId };

  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  let childData = await getCollectionData("children", reference);

  if (isObjEmpty(childData)) {
    content = (
      <div className="flex flex-col justify-around items-center text-sm mb-1 w-screen bg-neutral-300 text-neutral-900 h-fit">
        <h1>Empty</h1>
      </div>
    );
  } else {
    content = childData.map((child) => {
      return (
        <div
          key={child.id}
          className="flex flex-col items-center md:items-start text-sm mb-1 w-full bg-neutral-200/80 text-neutral-800"
        >
          <Link
            href={`/collection/${categoryId}/${parentId}/${child.id}`}
            className="flex-none"
          >
            <h1 className="md:ml-12 text-lg my-5 sm:my-9 ring ring-neutral-600 bg-neutral-100 ring-offset-4 hover:ring-offset-2 hover:ring-neutral-800 ring-opacity-40 shadow-lg shadow-neutral-800 px-5 rounded-md">
              {child.name}
            </h1>
          </Link>
          <div className="w-full">
            <Suspense
              fallback={
                <h1 className="text-md text-center mx-auto">
                  Loading items data...
                </h1>
              }
            >
              <Items
                categoryId={categoryId}
                parentId={parentId}
                childId={child.id}
                items={child.items}
              />
            </Suspense>
          </div>
        </div>
      );
    });
  }
  return content;
}
