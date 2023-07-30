import Link from "next/link";
import Image from "next/image";

import SlickCarousel from "./components/SlickCarousel";

export default async function Parents({ categoryId, parents }) {
  return (
    <SlickCarousel>
      {parents.map((parent) => {
        return (
          parent.CategoryId === categoryId && (
            <div className="flex flex-col gap-3 items-center justify-between">
              <div className={`relative w-56 h-56 mx-auto`}>
                {parent.image && (
                  <Image
                    src={parent.image}
                    srcSet={parent.id}
                    alt={parent.id}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="absolute object-contain"
                    priority={true}
                  />
                )}
              </div>
              <div className="text-center text-lg py-5">
                <Link
                  key={parent.id}
                  href={`/collection/${categoryId}/${parent.id}`}
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
