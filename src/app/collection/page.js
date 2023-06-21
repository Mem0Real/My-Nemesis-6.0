import Image from "next/image";
import Link from "next/link";
import { getEntries } from "./actions";
import { notFound } from "next/navigation";

export default async function CollectionPage() {
  const categories = await getEntries("categories");

  if (!categories[0].name) return notFound();

  const content = categories.map((category) => {
    return (
      <div
        key={category.id}
        className="flex flex-col justify-center items-center ps-2 text-sm mb-1 w-full bg-neutral-100 text-neutral-900"
      >
        <div className="flex flex-col justify-center items-center">
          <Link href={`/collection/${category.id}`}>
            <h1 className="text-center text-lg my-5 sm:my-9 ring ring-neutral-600 ring-offset-4 hover:ring-offset-2 hover:ring-neutral-800 ring-opacity-40 shadow-lg shadow-neutral-800 px-5 rounded-md">
              {category.name}
            </h1>
          </Link>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row justify-evenly items-center w-full lg:px-6 md:border md:border-x-0 border-neutral-800">
          {category.parents.map((parent) => {
            return (
              <Link
                key={parent.id}
                href={`/collection/${category.id}/${parent.id}`}
              >
                <div className="flex flex-col justify-evenly items-center cursor-pointer group mb-12 mt-6 md:mb-0 md:mx-6">
                  <h1 className="text-center text-lg rounded-md sm:my-9 underline underline-offset-8 hover:underline-offset-4 my-3">
                    {parent.name}
                  </h1>
                  {parent.image && (
                    <Image
                      src={`/images/${category.id}/${parent.id}.png`}
                      width="200"
                      height="200"
                      alt={`${parent.name}-image`}
                      className="md:mb-12 md:h-40"
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  });
  return (
    <div className="flex flex-col justify-evenly items-center w-screen mt-12">
      {content}
    </div>
  );
}
