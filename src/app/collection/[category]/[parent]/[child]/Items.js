import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

import { getEntries } from "@/app/collection/actions";

export default async function Children(props) {
  let content;
  const CategoryId = props.CategoryId;
  const ParentId = props.ParentId;
  const ChildId = props.ChildId;
  const itemsProp = { ChildId: ChildId };

  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  const itemsData = await getEntries("items", itemsProp);

  if (isObjEmpty(itemsData)) {
    content = (
      <div className="flex flex-col justify-around items-center text-sm mb-1 w-screen bg-neutral-300 text-neutral-900 h-fit">
        <h1>Empty</h1>
      </div>
    );
  } else {
    content = itemsData.map((item) => {
      return (
        <div
          key={item.id}
          className="flex flex-col justify-between items-center"
        >
          <Link
            href={`/collection/${CategoryId}/${ParentId}/${ChildId}/${item.id}`}
          >
            <h1 className="text-center text-lg my-5 underline underline-offset-8 hover:underline-offset-4">
              {item.name}
            </h1>
          </Link>
          <div className="w-56 h-56"></div>
          {/* <Image
            src={`/images/${categoryName}/${parentName}/${childName}/${item.id}.png`}
            width="200"
            height="200"
            alt={`${item.name}-image`}
            className="md:mb-12 md:h-40"
          /> */}
        </div>
      );
    });
  }
  return <div className="flex justify-around items-center"> {content}</div>;
}
