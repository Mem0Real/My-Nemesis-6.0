import { Suspense } from "react";
import Link from "next/link";

import { getEntry } from "@/app/collection/actions";

export async function generateMetadata({ params: { item } }) {
  let firstLetter = item[0];
  firstLetter = firstLetter.toUpperCase();
  let itemName = firstLetter + item.slice(1);

  return {
    title: `Nemesis - ${itemName}`,
  };
}

export default async function Item(props) {
  let content;
  let CategoryId = props.params.category;
  let ParentId = props.params.parent;
  let ChildId = props.params.child;
  let currentItem = props.params.item;

  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  const itemData = await getEntry("items", currentItem);
  if (isObjEmpty(itemData)) {
    content = (
      <div className="flex flex-col justify-around items-center text-sm mb-1 w-screen bg-neutral-300 text-neutral-900 h-fit">
        <h1>Empty</h1>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col justify-center items-center w-screen min-h-screen bg-neutral-100 text-neutral-900 mt-9">
        <div className="flex justify-end items-end w-full p-4">
          <Link href={`/collection/${CategoryId}/${ParentId}/${ChildId}`}>
            <h2 className="text-xs px-2 py-1 mt-4 md:px-4 md:py-2 bg-neutral-900 text-white rounded-md mr-4">
              Go Back
            </h2>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center w-screen min-h-screen">
          {/* <Image
            src={`/images/${CategoryId}/${ParentId}/${ChildId}/${itemData.id}.png`}
            width="500"
            height="500"
            alt={`${itemData.name}-image`}
            className="md:mb-12"
          /> */}
          <div className="flex flex-col justify-evenly items-center md:h-96 md:w-96 text-center">
            <p className="my-6">
              Name <br /> {itemData.name}
            </p>
            <p className="my-6">
              Type <br /> {itemData.type}
            </p>
            <p className="my-6">
              Model <br /> {itemData.model}
            </p>
            <p className="my-6 md:h-24 h-fit">
              Details <br /> {itemData.description}
            </p>
            <p className="my-6">
              Quantity <br /> {itemData.quantity}
            </p>
            <p className="my-6">
              Price <br /> {itemData.price}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return content;
}
