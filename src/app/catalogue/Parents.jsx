import Link from "next/link";
import Image from "next/image";

import SlickCarousel from "./components/SlickCarousel";

export default async function Parents({ categoryId, parents }) {
  return (
    <SlickCarousel>
      {parents.map((parent) => {
        return (
          parent.CategoryId === categoryId && (
            <div
              key={parent.id}
              className="flex flex-col gap-3 items-center justify-between p-5 my-12"
            >
              <div className="border border-neutral-400 border-b-0 rounded-t-2xl drop-shadow-xl">
                <div className="relative w-56 h-56 mx-auto">
                  {parent.image ? (
                    <Image
                      src={parent.image}
                      srcSet={parent.id}
                      alt={parent.id}
                      fill={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="absolute object-contain"
                      priority={true}
                    />
                  ) : (
                    <div className="w-56 h-56 mx-auto flex flex-col items-center justify-center text-neutral-700 dark:text-neutral-300">
                      <h1 className="text-xs italic">No Image</h1>
                    </div>
                  )}
                </div>
              </div>
              <div className="border border-neutral-400 rounded-b-2xl text-center text-sm py-5 hover:underline underline-offset-2">
                <Link
                  key={parent.id}
                  href={`/catalogue/${categoryId}/${parent.id}`}
                >
                  <h1>{parent.name}</h1>
                </Link>
              </div>
            </div>
          )
        );
      })}
    </SlickCarousel>
  );
}
