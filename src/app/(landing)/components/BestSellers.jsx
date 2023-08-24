import Image from "next/image";
import Link from "next/link";

import SellerAnimator from "./(animators)/SellerAnimator";

export default function BestSellers({ products }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-3 md:py-12 gap-6 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
      <h1 className="text-3xl font-semibold my-5 pb-5">Best Sellers</h1>
      <div className="w-full mx-auto flex flex-wrap items-center h-full">
        {products.map((product) => {
          return (
            <SellerAnimator product={product}>
              <Image
                className="object-contain object-center"
                src={product.images[0]}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
                alt={product.id}
              />
            </SellerAnimator>
          );
        })}
      </div>
      <Link
        href="/products"
        className="bg-purple-700 rounded-lg px-6 py-2 text-neutral-300 dark:text-neutral-900 hover:bg-neutral-900 dark:hover:bg-neutral-100 transition-all ease-in-out duration-200"
      >
        Browse Products
      </Link>
    </div>
  );
}
