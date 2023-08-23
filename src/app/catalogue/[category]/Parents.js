import Children from "./Children";
import Link from "next/link";
import { Suspense } from "react";

import { getCollectionData } from "../lib/fetchFunctions";

import ChildLoader from "../components/(loader)/ChildLoader";

export default async function Parents({ categoryId }) {
  let content;
  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  const reference = { CategoryId: categoryId };

  let parentData = await getCollectionData("parents", reference);

  if (isObjEmpty(parentData)) {
    content = (
      <div className="flex flex-col justify-around items-center text-sm w-screen bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 h-fit">
        <h1>Empty</h1>
      </div>
    );
  } else {
    content = parentData.map((parent) => {
      return (
        <div
          key={parent.id}
          className="flex flex-col items-center md:items-start text-sm w-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
        >
          <Link
            href={`/catalogue/${categoryId}/${parent.id}`}
            className="flex-none"
          >
            <h1 className="md:ml-12 text-lg my-5 sm:my-9 bg-neutral-100 dark:bg-neutral-900 ring ring-opacity-40 ring-neutral-600 ring-offset-2 dark:ring-neutral-800 hover:ring-offset-1 hover:ring-neutral-500 dark:hover:ring-neutral-700 shadow-lg shadow-neutral-800 hover:shadow-neutral-600 dark:shadow-neutral-900 dark:hover:shadow-neutral-950 px-5 rounded-sm">
              {parent.name}
            </h1>
          </Link>
          <div className="w-full">
            <Suspense fallback={<ChildLoader />}>
              <div className="group mx-auto w-[95%] border border-neutral-300 rounded-3xl shadow-neutral-400 hover:shadow-neutral-600 dark:shadow-neutral-900 dark:hover:shadow-black dark:border-neutral-700">
                <Children
                  categoryId={categoryId}
                  parentId={parent.id}
                  childrenData={parent.children}
                />
              </div>
            </Suspense>
          </div>
        </div>
      );
    });
  }
  return (
    <div className="flex flex-col justify-evenly items-center w-screen">
      {content}
    </div>
  );
}
