import { Suspense } from "react";
import Link from "next/link";

import { getDetail } from "@/app/catalogue/lib/fetchFunctions";
import Item from "./Item";
import ItemDetailLoader from "@/app/catalogue/components/(loader)/ItemDetailLoader.jsx";

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
      <div className="w-full flex flex-col items-center justify-center py-16 md:py-20 lg:py-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold">
          Empty
        </h1>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col items-center w-screen min-h-screen bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 pt-6 relative">
        <Suspense fallback={<ItemDetailLoader />}>
          <Item item={itemData} />
        </Suspense>
        <Link
          href={`/catalogue/${currentCategory}/${currentParent}/${currentChild}`}
          className="absolute top-16 right-0 md:right-12 bg-transparent rounded-md px-4 py-2 text-neutral-800 dark:text-neutral-200 hover:outline outline-1 outline-neutral-800 dark:outline-neutral-200 z-20"
        >
          Back
        </Link>
      </div>
    );
  }
  return <div className="relative flex flex-col items-center">{content}</div>;
}
