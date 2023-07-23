import Link from "next/link";
import Image from "next/image";

import SlickCarousel from "./components/SlickCarousel";

export default async function Parents({ categoryId, parents }) {
  return (
    <SlickCarousel>
      {parents.map((parent) => {
        return (
          parent.CategoryId === categoryId && (
            <div key={parent.id} className="flex gap-4">
              <Link
                href={`/collection/${categoryId}/${parent.id}`}
                className="flex w-56 mx-auto flex-col items-center group md:my-5 bg-transparent "
              >
                <div
                  className={`${
                    !parent.image && "invisible"
                  } relative w-full h-44 border border-neutral-200 rounded-t-3xl shadow-inner shadow-neutral-900 hover:shadow-black transition-all ease-in-out dark:border-neutral-800 min-h-fit min-w-fit`}
                >
                  {parent.image && (
                    <Image
                      src={parent.image}
                      srcSet={parent.id}
                      alt={parent.id}
                      fill={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="absolute object-contain"
                      priority={true}
                      blurDataURL="URL"
                      placeholder="blur"
                    />
                  )}
                </div>
                <div
                  className="w-full h-12 flex flex-col items-start ps-4 pt-3 rounded-b-2xl bg-neutral-300 text-neutral-800 shadow-xl shadow-neutral-50 transition-all ease-in-out duration-500 group-hover:shadow-white dark:bg-neutral-800 dark:text-neutral-200 dark:shadow-neutral-950 dark:group-hover:shadow-black
                "
                >
                  <h1>{parent.name}</h1>
                </div>
              </Link>
            </div>
          )
        );
      })}
    </SlickCarousel>
  );
}
