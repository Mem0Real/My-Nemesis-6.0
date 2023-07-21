import { Suspense } from "react";
import Link from "next/link";

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

  const BackIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ccc9c9"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 16l-6-6 6-6" />
      <path d="M20 21v-7a4 4 0 0 0-4-4H5" />
    </svg>
  );
  const content = (
    <div className="flex flex-col justify-between items-center text-sm mb-1 w-screen bg-neutral-800 text-neutral-200 h-fit pt-12">
      <Suspense
        fallback={
          <h1 className="text-3xl mx-auto">Loading current parent...</h1>
        }
      >
        <Parent categoryId={currentCategory} parentId={currentParent} />
      </Suspense>
      <Link
        href={`/collection/${currentCategory}`}
        className="absolute top-5 right-0 md:right-12 bg-neutral-700 rounded-md px-4 py-2 text-neutral-200 hover:outline outline-1 outline-black"
      >
        Back
      </Link>
    </div>
  );

  return (
    <div className="relative flex flex-col justify-evenly items-center w-screen">
      {content}
    </div>
  );
}
