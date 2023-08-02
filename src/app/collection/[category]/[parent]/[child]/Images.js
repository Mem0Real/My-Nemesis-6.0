import Link from "next/link";
import Image from "next/image";
import SlickCarousel from "@/app/collection/components/SlickCarousel";

export default function Images({
  categoryId,
  parentId,
  childId,
  itemId,
  images,
}) {
  // TODO image click full screen
  return (
    <SlickCarousel>
      {images &&
        images.map((img, index) => {
          return (
            <Link
              key={index}
              href={`/collection/${categoryId}/${parentId}/${childId}/${itemId}`}
              className="flex flex-col gap-3 items-center justify-between p-5"
            >
              <div className="border border-neutral-400 rounded-2xl drop-shadow-xl">
                <div className="relative w-56 h-56 mx-auto">
                  {img ? (
                    <Image
                      src={img}
                      srcSet={itemId}
                      alt={itemId}
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
            </Link>
          );
        })}
    </SlickCarousel>
  );
}
