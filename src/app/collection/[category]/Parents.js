import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

import { getEntries } from "@/app/collection/actions";

export default async function Parents(props) {
  let content;
  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  const categoryId = props.CategoryId;
  const parentData = await getEntries("parents", props);

  if (isObjEmpty(parentData)) {
    content = (
      <div className="flex flex-col justify-around items-center text-sm mb-1 w-screen bg-neutral-300 text-neutral-900 h-fit">
        <h1>Empty</h1>
      </div>
    );
  } else {
    content = parentData.map((parent) => {
      return (
        <div
          key={parent.id}
          className="flex flex-col justify-center items-center ps-2 text-sm mb-1 bg-neutral-100 text-neutral-900"
        >
          <div className="flex flex-col justify-center items-center">
            <Link href={`/collection/${categoryId}/${parent.id}`}>
              <h1 className="text-center text-lg my-5 sm:my-9 ring ring-neutral-600 ring-offset-4 hover:ring-offset-2 hover:ring-neutral-800 ring-opacity-40 shadow-lg shadow-neutral-800 px-5 rounded-md">
                {parent.name}
              </h1>
            </Link>
          </div>
          <Suspense fallback={<h1>Loading...</h1>}>
            <div className="flex flex-wrap flex-col md:flex-row justify-evenly items-center w-full lg:px-6 md:border md:border-x-0 border-neutral-800">
              {parent.children.map((child) => {
                return (
                  <Link
                    key={child.id}
                    href={`/collection/${categoryId}/${parent.id}/${child.id}`}
                  >
                    <div className="flex flex-col justify-evenly items-center cursor-pointer group mb-12 mt-6 md:mb-0 md:mx-6">
                      <h1 className="text-center text-lg rounded-md sm:my-9 underline underline-offset-8 hover:underline-offset-4 my-3">
                        {child.name}
                      </h1>
                      {child.image && (
                        <Image
                          src={child.image}
                          width="200"
                          height="200"
                          alt={`${child.name}-image`}
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
