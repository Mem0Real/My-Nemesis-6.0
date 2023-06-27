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
  return (
    <SlickCarousel>
      {images.map((img, index) => {
        return (
          <div key={index} className="flex gap-4">
            <Link
              href={`/collection/${categoryId}/${parentId}/${childId}/${itemId}`}
              className="flex w-56 mx-auto flex-col items-center group md:my-5 bg-transparent "
            >
              <div
                className={`${
                  !img && "invisible"
                } relative w-full h-44 border border-black rounded-t-3xl shadow-inner shadow-neutral-950 hover:shadow-neutral-700 transition-all ease-in-out`}
              >
                <Image
                  src={img}
                  srcSet={itemId}
                  alt={itemId}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="absolute object-contain"
                  priority={true}
                  blurDataURL="URL"
                  placeholder="blur"
                />
              </div>
            </Link>
          </div>
        );
      })}
    </SlickCarousel>
  );
}
