import { motion, AnimatePresence } from "framer-motion";

import { useProductListContext } from "../productList";
import Image from "next/image";

// TODO add cookies to store opened data
export default function List() {
  const { products } = useProductListContext();

  if (products.length === 0) {
    return (
      <div className="basis-4/5 flex flex-col items-center justify-start min-h-screen">
        <div className="text-lg text-neutral-800 dark:text-neutral-200 mt-36">
          Product not found. Please adjust your filter and try again.
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-evenly flex-wrap gap-12 pb-6">
      {products.map((product) => {
        let image = product.images[0];
        return (
          <div key={product.id} className="flex flex-col gap-8 items-center">
            <div
              className={`relative w-72 h-60 border border-neutral-200 rounded-t-3xl shadow-innerGlow shadow-neutral-900 hover:shadow-black transition-all ease-in-out dark:border-neutral-800 min-h-fit min-w-fit`}
            >
              {product.images.length > 0 && (
                <Image
                  src={image}
                  alt={product.id}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="absolute object-contain"
                  placeholder={product.id}
                />
              )}
            </div>

            <h1 className="text-center">{product.name}</h1>
          </div>
        );
      })}
    </div>
  );
}
