import Link from "next/link";

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
    <div className="flex items-center content-start justify-center flex-wrap gap-0 py-6 w-full">
      {products.map((product) => {
        let image = product.images[0];
        return (
          <div
            key={product.id}
            className="flex flex-col gap-8 w-72 h-60 items-center border border-neutral-500"
          >
            <motion.div
              className={`relative w-60 h-60 cursor-pointer`}
              whileHover={{
                scale: 1.25,
                transition: { duration: 0.25 },
              }}
            >
              {product.images.length > 0 && (
                <Link
                  href={`/collection/${product.CategoryId}/${product.ParentId}/${product.ChildId}/${product.id}`}
                >
                  <Image
                    src={image}
                    alt={product.id}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="absolute object-contain object-center overflow-crop"
                  />
                </Link>
              )}
            </motion.div>

            <h1 className="text-center">{product.name}</h1>
          </div>
        );
      })}
    </div>
  );
}
