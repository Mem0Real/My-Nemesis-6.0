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
    <div className="flex flex-col justify-between items-center text-sm mb-1 w-screen bg-neutral-100 text-neutral-900 h-fit md:mt-12">
      <div className="flex justify-end items-end w-full p-4">
        <Link href={`/collection/${currentCategory}/${currentParent}`}>
          <h2 className="px-2 py-1 md:top-24 md:right-12 md:px-4 md:py-2 bg-neutral-900 text-white rounded-lg">
            Go Back
          </h2>
        </Link>
      </div>
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
    </div>
  );

  return content;
}
