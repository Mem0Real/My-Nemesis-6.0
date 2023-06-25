import Image from "next/image";
import { Suspense } from "react";

export default function CarouselData({ parentsData }) {
  {
    parentsData.map((parent) => {
      return (
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
      );
    });
  }
}
