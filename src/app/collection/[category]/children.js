import Link from "next/link";
import Image from "next/image";
import SlickCarousel from "@/app/collection/components/SlickCarousel";

export default function Children({ categoryId, parentId, childrenData }) {
  return (
    <SlickCarousel>
      {childrenData.map((child) => {
        return (
          child.ParentId === parentId && (
            <div
              key={child.id}
              className="flex flex-col gap-3 items-center justify-between"
            >
              <div className="relative w-56 h-56 mx-auto">
                {child.image ? (
                  <Image
                    src={child.image}
                    srcSet={child.id}
                    alt={child.id}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="absolute object-contain"
                    priority={true}
                  />
                ) : (
                  <div className="w-56 h-56 mx-auto flex flex-col items-center justify-center text-neutral-700 dark:text-neutral-300">
                    <h1 className="text-xs italic">No Image</h1>
                  </div>
                )}{" "}
              </div>
              <div className="text-center text-lg py-5 hover:underline underline-offset-2">
                <Link
                  href={`/collection/${categoryId}/${parentId}/${child.id}`}
                  className="flex w-56 mx-auto flex-col items-center group md:my-5 bg-transparent "
                >
                  <h1>{child.name}</h1>
                </Link>
              </div>
            </div>
          )
        );
      })}
    </SlickCarousel>
  );
}
