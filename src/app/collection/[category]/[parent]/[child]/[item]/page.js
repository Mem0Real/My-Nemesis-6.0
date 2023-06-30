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

  if (isObjEmpty(itemData)) {
    content = (
      <div className="flex flex-col justify-around items-center text-sm mb-1 w-screen bg-neutral-300 text-neutral-900 h-fit">
        <h1>Empty</h1>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col items-center w-screen min-h-screen bg-neutral-800 text-neutral-200 pt-2">
        <div className="flex justify-end items-end w-full p-4">
          <Link
            href={`/collection/${currentCategory}/${currentParent}/${currentChild}`}
          >
            <h2 className="text-xs px-2 py-1 mt-4 md:px-4 md:py-2 bg-neutral-900 text-white rounded-md mr-4">
              Go Back
            </h2>
          </Link>
        </div>

        {/* <div className="flex w-full">
          <div className="flex-1">
            {itemData.image && (
              <div className="flex flex-col items-center gap-12">
                {itemData.map((image, index) => {
                  return (
                    <div key={index} className="relative h-36 w-36 mb-6 ">
                      <Image
                        src={src}
                        fill={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
                        alt="Image"
                        className="object-contain rounded-lg"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex-1 ms-12 mb-6">
            <h1 className="text-4xl font-bold ms-4 mb-2">Product Details</h1>
            <div className="flex flex-col items-start ps-5 gap-7 py-6 w-[60%] bg-neutral-900 border border-neutral-200 text-neutral-200 rounded-xl">
              <div className="flex gap-4 w-full">
                <h1 className=" text-md font-semibold">Product Name: </h1>
                <h2 className="ms-3 text-md"> {itemData.name}</h2>
              </div>
              <div className="flex gap-4 w-full">
                <h1 className="text-md font-semibold">Product Type: </h1>
                <h2 className="ms-3 text-md"> {itemData.type}</h2>
              </div>
              <div className="flex gap-4 w-full">
                <h1 className="text-md font-semibold">Product Model:</h1>
                <h2 className="ms-3 text-md"> {itemData.model}</h2>
              </div>
              <div className="w-[96%]">
                <h1 className="text-md font-semibold md:mb-3">Details:</h1>
                <div className="h-48 border border-neutral-500 rounded-md">
                  <h2 className="ms-3 text-md"> {itemData.description}</h2>
                </div>
              </div>
              <div className="flex gap-4 w-full">
                <h1 className="text-md font-semibold">Quantity:</h1>
                <h2 className="ms-3 text-md"> {itemData.quantity}</h2>
              </div>
              <div className="flex gap-4 w-full">
                <h1 className="text-md font-semibold">Price:</h1>
                {itemData.price && (
                  <h2 className="ms-3 text-md flex gap-2">
                    {itemData.price}
                    <span className="text-neutral-400 text-sm font-thin">
                      (ETB)
                    </span>
                  </h2>
                )}
              </div>
            </div>
          </div>
        </div> */}

        <Suspense fallback={<h1 className="text-xl mx-auto">Loading Item</h1>}>
          <Item item={itemData} />
        </Suspense>
      </div>
    );
  }

  return content;
}
