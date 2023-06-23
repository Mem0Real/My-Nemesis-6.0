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
        className="flex flex-col items-center md:items-start text-sm mb-1 w-full bg-neutral-200/80 text-neutral-800"
      >
        <Link href={`/collection/${category.id}`} className="flex-none">
          <h1 className="md:ml-12 text-lg my-5 sm:my-9 ring ring-neutral-600 bg-neutral-100 ring-offset-4 hover:ring-offset-2 hover:ring-neutral-800 ring-opacity-40 shadow-lg shadow-neutral-800 px-5 rounded-md">
            {category.name}
          </h1>
        </Link>
        <div className="flex flex-wrap flex-col md:flex-row py-5 gap-8 items-center justify-center w-full lg:px-6 md:border-b">
          {category.parents.map((parent) => {
            return (
              <Link
                key={parent.id}
                href={`/collection/${category.id}/${parent.id}`}
              >
                {/* <div className="flex flex-col gap-2 shadow-3xl shadow-black items-stretch border-b-8 hover:border-b-4 hover:border-t-4 inset-7 border-l-black/80 border-neutral-700 shadow-inner cursor-pointer group md:mx-2 rounded-3xl text-neutral-800 w-72">
                  <div className="relative h-44 w-[95%] backdrop-blur-3xl shadow-xl mt-2 ms-1.5">
                    {parent.image && (
                      <Image
                        src={parent.image}
                        fill={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
                        alt="Image"
                        className="object-cover border-none"
                      />
                    )}
                  </div>
                  <h1 className="text-center text-base rounded-md sm:my-9 underline underline-offset-8 hover:underline-offset-4">
                    {parent.name}
                  </h1>
                </div> */}
                <div className="flex flex-col items-center group">
                  {parent.image && (
                    <div
                      className="w-56 h-44 border border-black rounded-t-3xl shadow-inner shadow-neutral-950 hover:shadow-neutral-700 transition-all ease-in-out "
                      style={{
                        backgroundImage: `url(${parent.image})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  )}
                  <div className="h-12 flex flex-col items-start ps-4 pt-3 rounded-b-2xl w-full bg-neutral-800 text-neutral-200 shadow-xl shadow-neutral-950 transition-all ease-in-out duration-500 group-hover:shadow-neutral-700 ">
                    <h1>{parent.name}</h1>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  });
  return (
    <div className="flex flex-col justify-evenly items-center w-screen">
      {content}
    </div>
  );
}
