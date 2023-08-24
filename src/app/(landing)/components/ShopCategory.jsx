import Link from "next/link";
import Image from "next/image";
import ShopAnimator from "./(animators)/ShopAnimator";

export default function ShopCategory({ categories }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-6 md:py-12 gap-6 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
      <h1 className="text-3xl font-semibold my-5 pb-5">Shop by Category</h1>
      <div className="w-full mx-auto flex flex-wrap items-center h-full">
        {categories?.map((category) => {
          return (
            <ShopAnimator category={category}>
              <Image
                className="object-contain object-center"
                src={category.image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
                alt={category.id}
              />
            </ShopAnimator>
          );
        })}
      </div>
      <Link
        href="/catalogue"
        className="bg-purple-700 rounded-lg px-6 py-2 text-neutral-300 dark:text-neutral-900 hover:bg-neutral-900 dark:hover:bg-neutral-100 transition-all ease-in-out duration-200"
      >
        View All
      </Link>
    </div>
  );
}
