import { Suspense } from "react";
import Link from "next/link";

import { getDetail } from "@/app/catalogue/lib/fetchFunctions";
import Item from "./Item";

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
      <div className="flex flex-col justify-around items-center text-sm mb-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 min-h-screen w-screen">
        <h1>Empty</h1>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col items-center w-screen min-h-screen bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 pt-6">
        <Suspense fallback={<h1 className="text-xl mx-auto">Loading Item</h1>}>
          <Item item={itemData} />
        </Suspense>
        <Link
          href={`/catalogue/${currentCategory}/${currentParent}/${currentChild}`}
          className="absolute top-5 right-0 md:right-12 bg-transparent rounded-md px-4 py-2 text-neutral-800 dark:text-neutral-200 hover:outline outline-1 outline-neutral-800 dark:outline-neutral-200"
        >
          Back
        </Link>
      </div>
    );
  }
  return <div className="relative flex flex-col items-center">{content}</div>;
}
