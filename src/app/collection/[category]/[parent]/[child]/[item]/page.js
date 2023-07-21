import { Suspense } from "react";
import Link from "next/link";

import { getDetail } from "@/app/collection/lib/fetchFunctions";
import Item from "./item";

export async function generateMetadata({ params: { item } }) {
  let firstLetter = item[0];
  firstLetter = firstLetter.toUpperCase();
  let itemName = firstLetter + item.slice(1);

  return {
    title: `Nemesis - ${itemName}`,
  };
}

export default async function ItemPage({
  params: { category, parent, child, item },
}) {
  let content;
  let currentCategory = category;
  let currentParent = parent;
  let currentChild = child;
  let currentItem = item;

  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  const itemData = await getDetail("items", currentItem);

  if (itemData && isObjEmpty(itemData)) {
    content = (
      <div className="flex flex-col justify-around items-center text-sm mb-1 w-screen bg-neutral-300 text-neutral-900 h-fit">
        <h1>Empty</h1>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col items-center w-screen min-h-screen bg-neutral-800 text-neutral-200 pt-2">
        <div className="flex justify-end items-end w-full p-4"></div>

        <Suspense fallback={<h1 className="text-xl mx-auto">Loading Item</h1>}>
          <Item item={itemData} />
        </Suspense>
        <Link
          href={`/collection/${currentCategory}/${currentParent}/${currentChild}`}
        >
          <h2 className="text-xs px-2 py-1 mt-4 md:px-4 md:py-2 bg-neutral-900 text-white rounded-md mr-4">
            Go Back
          </h2>
        </Link>
      </div>
    );
  }

  return content;
}
