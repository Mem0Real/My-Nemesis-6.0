import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";

import { useProductListContext } from "../ProductList";
import Image from "next/image";

// TODO add to cart functionality on the page itself. Should somehow join it with cart data

export default function ListData() {
  const { products } = useProductListContext();

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen">
        <div className="text-lg text-neutral-800 dark:text-neutral-200 mt-36">
          Product not found. Please adjust your filter and try again.
        </div>
      </div>
    );
  }
  return (
    <div className="grid w-[98%] lg:w-full mx-auto gap-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-between">
      {products.map((product) => {
        let image = product.images[0];
        let price;
        price = product.price && product.price?.toLocaleString();
        return (
          <Link
            key={product.id}
            href={`/catalogue/${product.CategoryId}/${product.ParentId}/${product.ChildId}/${product.id}`}
          >
            <div className="grid grid-cols-1 h-96 w-full border border-neutral-300/80 dark:border-neutral-700/90">
              <motion.div
                className="row-span-6 relative w-full h-56 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-56 lg:h-56 mx-auto self-center"
                whileHover={{
                  scale: 1.2,
                  transition: {
                    duration: 0.2,
                    ease: "easeInOut",
                  },
                }}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  transition: { delay: 0.5, duration: 0.3 },
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { delay: 0.5, duration: 0.3 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  transition: { delay: 0.5, duration: 0.3 },
                }}
              >
                {product.images?.length > 0 && (
                  <Image
                    src={image}
                    alt={product.id}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain object-center"
                  />
                )}
              </motion.div>
              <motion.div
                className="flex flex-col items-center w-full pb-5 text-base justify-start"
                initial={{ opacity: 0, x: 20, transition: { delay: 0.4 } }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}
                exit={{ opacity: 0, x: 20, transition: { delay: 0.4 } }}
              >
                <motion.h1 className="text-justify px-2 lg:pl-5 w-full min-h-max self-center hover:underline underline-offset-2 font-semibold">
                  {product.name}
                </motion.h1>
                <motion.h1 className="text-start font-thin text-neutral-800 dark:text-neutral-200 px-2 lg:pl-5 w-full hover:animate-pulse">
                  ${price}.00
                  <span className="px-2 text-[14px] italic font-light text-neutra-600 dark:text-neutral-400">
                    ETB
                  </span>
                </motion.h1>
              </motion.div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
