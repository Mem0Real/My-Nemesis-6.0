import Link from "next/link";
import Image from "next/image";
import SlickCarousel from "../components/SlickCarousel";

export default function Children({ categoryId, parentId, children }) {
  return (
    <SlickCarousel>
      {children.map((child) => {
        return (
          child.ParentId === parentId && (
            <div key={child.id} className="flex gap-4">
              <Link
                href={`/collection/${categoryId}/${parentId}/${child.id}`}
                className="flex w-56 mx-auto flex-col items-center group md:my-5 bg-transparent "
              >
                <div
                  className={`${
                    !child.image && "invisible"
                  } relative w-full h-44 border border-black rounded-t-3xl shadow-inner shadow-neutral-950 hover:shadow-neutral-700 transition-all ease-in-out`}
                >
                  {child.image && (
                    <Image
                      src={child.image}
                      srcSet={child.id}
                      alt={child.id}
                      fill={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="absolute object-contain"
                      priority={true}
                      blurDataURL="URL"
                      placeholder="blur"
                    />
                  )}
                </div>
                <div className="w-full h-12 flex flex-col items-start ps-4 pt-3 rounded-b-2xl bg-neutral-800 text-neutral-200 shadow-xl shadow-neutral-950 transition-all ease-in-out duration-1000 group-hover:shadow-neutral-700 ">
                  <h1>{child.name}</h1>
                </div>
              </Link>
            </div>
          )
        );
      })}
    </SlickCarousel>
  );
}
