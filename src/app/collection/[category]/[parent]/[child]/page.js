import { Suspense } from "react";
import Link from "next/link";
import Child from "./Child";

export async function generateMetadata({ params: { child } }) {
  let firstLetter = child[0];
  firstLetter = firstLetter.toUpperCase();
  let childName = firstLetter + child.slice(1);

  return {
    title: `Nemesis - ${childName}`,
  };
}

export default async function ChildData({
  params: { category, parent, child },
}) {
  let currentCategory = category;
  let currentParent = parent;
  let currentChild = child;

  const content = (
    <div className="flex flex-col justify-between items-center text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 pt-6 w-screen min-h-screen">
      <Suspense
        fallback={
          <h1 className="text-3xl mx-auto">Loading current child...</h1>
        }
      >
        <Child
          categoryId={currentCategory}
          parentId={currentParent}
          childId={currentChild}
        />
      </Suspense>
      <Link
        href={`/collection/${currentCategory}/${currentParent}`}
        className="absolute top-5 right-0 md:right-12 bg-transparent rounded-md px-4 py-2 text-neutral-800 dark:text-neutral-200 hover:outline outline-1 outline-neutral-800 dark:outline-neutral-200"
      >
        Back
      </Link>
    </div>
  );
  return <div className="relative flex flex-col items-center">{content}</div>;
}
