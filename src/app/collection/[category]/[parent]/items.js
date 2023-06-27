import Link from "next/link";
import Image from "next/image";
import SlickCarousel from "../../components/SlickCarousel";

export default function Items({ categoryId, parentId, childId, items }) {
  return (
    <SlickCarousel>
      {items.map((item) => {
        return (
          item.ChildId === childId && (
            <div key={item.id} className="flex gap-4">
              <Link
                href={`/collection/${categoryId}/${parentId}/${childId}/${item.id}`}
                className="flex w-56 mx-auto flex-col items-center group md:my-5 bg-transparent "
              >
                <div
                  className={`${
                    !item.image && "invisible"
                  } relative w-full h-44 border border-black rounded-t-3xl shadow-inner shadow-neutral-950 hover:shadow-neutral-700 transition-all ease-in-out`}
                >
                  {item.image && (
                    <Image
                      src={item.image}
                      srcSet={item.id}
                      alt={item.id}
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
                  <h1>{item.name}</h1>
                </div>
              </Link>
            </div>
          )
        );
      })}
    </SlickCarousel>
  );
}
