import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

import { getEntries } from "@/app/collection/actions";

export default async function Children(props) {
  let content;
  const CategoryId = props.CategoryId;
  const ParentId = props.ParentId;

  const childrenProp = { ParentId: ParentId };

  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  const childData = await getEntries("children", childrenProp);

  if (isObjEmpty(childData)) {
    content = (
      <div className="flex flex-col justify-around items-center text-sm mb-1 w-screen bg-neutral-300 text-neutral-900 h-fit">
        <h1>Empty</h1>
      </div>
    );
  } else {
    content = childData.map((child) => {
      return (
        <div
          key={child.id}
          className="flex flex-col justify-center items-center ps-2 text-sm mb-1 bg-neutral-100 text-neutral-900"
        >
          <div className="flex flex-col justify-center items-center">
            <Link href={`/collection/${CategoryId}/${ParentId}/${child.id}`}>
              <h1 className="text-center text-lg my-5 sm:my-9 ring ring-neutral-600 ring-offset-4 hover:ring-offset-2 hover:ring-neutral-800 ring-opacity-40 shadow-lg shadow-neutral-800 px-5 rounded-md">
                {child.name}
              </h1>
            </Link>
          </div>
          <Suspense fallback={<h1>Loading...</h1>}>
            <div className="flex flex-wrap flex-col md:flex-row justify-evenly items-center w-full lg:px-6 md:border md:border-x-0 border-neutral-800">
              {child.items.map((item) => {
                return (
                  <Link
                    key={item.id}
                    href={`/collection/${CategoryId}/${ParentId}/${child.id}/${item.id}`}
                  >
                    <div className="flex flex-col justify-evenly items-center cursor-pointer group mb-12 mt-6 md:mb-0 md:mx-6">
                      <h1 className="text-center text-lg rounded-md sm:my-9 underline underline-offset-8 hover:underline-offset-4 my-3">
                        {item.name}
                      </h1>
                      {item.image && (
                        <Image
                          src={item.image}
                          width="200"
                          height="200"
                          alt={`${item.name}-image`}
                          className="md:mb-12 md:h-40"
                        />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </Suspense>
        </div>
      );
    });
  }
  return content;
}
