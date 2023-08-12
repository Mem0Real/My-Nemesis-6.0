"use client";

import { useEffect } from "react";
import Image from "next/image";

import Lenis from "@studio-freight/lenis";
import { motion } from "framer-motion";

export default function BestSellers({ products }) {
  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="w-[90%] min-h-screen flex flex-col mx-auto items-center justify-start py-6 md:py-12 gap-6 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
      <h1 className="text-3xl font-semibold my-5 pb-5">Best Sellers</h1>
      <div className="w-full mx-auto flex flex-wrap items-center h-full">
        {products.map((product) => {
          return (
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              viewport={{ once: true }}
              key={product.id}
              className="flex flex-col gap-5 items-center w-full md:w-80 lg:w-60 mx-auto border border-neutral-300 dark:border-neutral-700 my-2"
            >
              <div className="relative w-full mb-12">
                <h2 className="absolute right-2 top-2 z-10 rounded-xl bg-red-500 px-3 py-1 text-xs">
                  SALE
                </h2>
                <motion.div
                  className="mt-4 basis-3/5 cursor-pointer relative h-72 md:h-56 lg:h-44 w-[90%] mx-auto"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 },
                  }}
                >
                  <Image
                    className="object-contain object-center"
                    src={product.images[0]}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
                    alt={product.id}
                  />
                </motion.div>
              </div>
              <h1 className="basis-1/5 self-start text-lg font-medium px-3">
                {product.name}
              </h1>
              <h1 className="basis-1/5 self-start flex items-center gap-1.5 text-base text-green-600 dark:text-green-400 px-3 pb-3">
                {formatter.format(product.price)}
                <span className="text-sm text-green-500 dark:text-green-300 tracking-wider">
                  ETB
                </span>
              </h1>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
