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
            <div key={item.id} className="flex gap-4">
              <div
                href={`/collection/${categoryId}/${parentId}/${childId}/${item.id}`}
                className="flex w-56 mx-auto flex-col items-center group md:my-5 bg-transparent "
              >
                <div
                  className={`${
                    !item.images && "invisible"
                  } relative w-full h-44 border-2 border-neutral-500 rounded-t-3xl shadow-inner shadow-neutral-900 hover:shadow-neutral-700 transition-all ease-in-out duration-1000`}
                >
                  {item.images && (
                    <NestedCarousel>
                      {item.images.map((image, index) => {
                        return (
                          <div key={index} className="relative h-40 mt-2 w-36">
                            <Image
                              src={image}
                              fill={true}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
                              alt="Image"
                              className="object-contain rounded-lg"
                            />
                          </div>
                        );
                      })}
                    </NestedCarousel>
                  )}
                </div>

                <Link
                  href={`/collection/${categoryId}/${parentId}/${childId}/${item.id}`}
                  className="w-full h-12 border-2 border-neutral-500 flex flex-col items-center pt-3 rounded-b-2xl bg-neutral-800 text-neutral-200 shadow-xl shadow-neutral-900 transition-all ease-in-out duration-1000 group-hover:shadow-neutral-700 group-hover:shadow-md "
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
