import Link from "next/link";
import { Suspense } from "react";
import Parents from "./Parents";
import Titles from "./components/Titles";
import CarouselHolder from "./components/CarouselHolder";

export default function Categories({ categories }) {
  const oldText = (
    <h1 className="md:ml-12 text-lg my-5 sm:my-9 bg-neutral-50 dark:bg-neutral-900 ring ring-neutral-500 dark:ring-neutral-700 ring-offset-2 ring-offset-neutral-400 dark:ring-offset-neutral-600 hover:ring-offset-1 hover:ring-neutral-400 dark:hover:ring-neutral-600 shadow-lg shadow-neutral-800 hover:shadow-neutral-600 dark:shadow-neutral-900 dark:hover:shadow-neutral-950 px-5 rounded-sm">
      category.name
    </h1>
  );
  const content = categories.map((category) => {
    return (
      <div
        key={category.id}
        className="flex flex-col items-center md:items-start text-sm mb-1 w-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 my-12"
      >
        <CarouselHolder>
          <Link href={`/catalogue/${category.id}`} className="px-5">
            <Titles
              name={category.name}
              className="text-3xl font-bold leading-8 mt-0 mb-5 text-center"
            />
          </Link>
          <div className="w-full">
            <Suspense
              fallback={
                <h1 className="text-md text-center mx-auto">
                  Loading parents...
                </h1>
              }
            >
              {/* <div className="group mx-auto w-[95%] border border-neutral-300 rounded-3xl shadow-neutral-400 hover:shadow-neutral-600 dark:shadow-neutral-900 dark:hover:shadow-black dark:border-neutral-700">
              <Parents categoryId={category.id} parents={category.parents} />
            </div> */}
              <Parents categoryId={category.id} parents={category.parents} />
            </Suspense>
          </div>
        </CarouselHolder>
      </div>
    );
  });

  return (
    <div className="flex flex-col justify-evenly items-center w-screen">
      <div className="w-full flex flex-col items-center justify-center py-8 md:py-10 lg:py-12 mb-2 shadow-xl shadow-blue-600/20 dark:shadow-blue-400/10 text-neutral-800 dark:text-neutral-200 backdrop-blur-sm bg-neutral-200/40 dark:bg-neutral-800/40">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight italic">
          Catalogue
        </h1>
      </div>
      {content}
    </div>
  );
}
