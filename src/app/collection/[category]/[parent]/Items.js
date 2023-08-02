import Link from "next/link";
import Image from "next/image";
import SlickCarousel from "@/app/collection/components/SlickCarousel";
import NestedCarousel from "@/app/collection/components/NestedCarousel";

export default function Items({ categoryId, parentId, childId, items }) {
  return (
    <SlickCarousel>
      {items.map((item) => {
        return (
          item.ChildId === childId && (
            <div
              key={item.id}
              className="flex flex-col gap-3 items-center justify-between p-5"
            >
              <div className="border border-neutral-400 border-b-0 rounded-t-2xl drop-shadow-xl">
                {item.images?.length > 0 ? (
                  <NestedCarousel>
                    {item.images.map((image, index) => {
                      return (
                        <div key={index} className="relative w-56 h-56 mx-auto">
                          <Image
                            src={image}
                            alt={item.id + index}
                            fill={true}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
                            className="absolute object-contain"
                            priority={true}
                          />
                        </div>
                      );
                    })}
                  </NestedCarousel>
                ) : (
                  <div className="w-56 h-56 mx-auto flex flex-col items-center justify-center text-neutral-700 dark:text-neutral-300">
                    <h1 className="text-xs italic">No Images</h1>
                  </div>
                )}
              </div>
              <div className="border border-neutral-400 rounded-b-2xl text-center text-sm py-5 hover:underline underline-offset-2">
                <Link
                  href={`/collection/${categoryId}/${parentId}/${childId}/${item.id}`}
                >
                  <h1>{item.name}</h1>
                </Link>
              </div>
            </div>
          )
        );
      })}
    </SlickCarousel>
  );
}
