import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";

export default function CarouselData({ categoryId, parentsData }) {
  return parentsData.map((parent) => {
    return (
      <Link key={parent.id} href={`/collection/${categoryId}/${parent.id}`}>
        <div className="flex flex-col items-center group md:my-5">
          <div className="relative w-56 h-44 border border-black rounded-t-3xl shadow-inner shadow-neutral-950 hover:shadow-neutral-700 transition-all ease-in-out">
            {parent.image && (
              <Suspense
                fallback={<h1 className="text-sm text-black">Loading Image</h1>}
              >
                <Image
                  src={parent.image}
                  alt={parent.id}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="absolute object-contain"
                />
              </Suspense>
            )}
          </div>
          <div className="h-12 flex flex-col items-start ps-4 pt-3 rounded-b-2xl w-full bg-neutral-800 text-neutral-200 shadow-xl shadow-neutral-950 transition-all ease-in-out duration-500 group-hover:shadow-neutral-700 ">
            <h1>{parent.name}</h1>
          </div>
        </div>
      </Link>
    );
  });
}
