"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import Lenis from "@studio-freight/lenis";
import { motion } from "framer-motion";

export default function ShopCategory({ categories }) {
  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="w-[95%] min-h-screen flex flex-col mx-auto items-center justify-start py-6 md:py-12 gap-6 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
      <h1 className="text-3xl font-semibold my-5 pb-5">Best Sellers</h1>
      <div className="w-full mx-auto flex flex-wrap items-center h-full">
        {categories?.map((category) => {
          return (
            <motion.div
              initial={{ scale: 0.7, y: 50, opacity: 0 }}
              exit={{ scale: 0.7, y: 50, opacity: 0 }}
              whileInView={{ scale: [1.2, 1], y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              viewport={{ once: true }}
              key={category.id}
              className="flex flex-col gap-6 items-center justify-center w-full md:w-80 lg:w-60 mx-auto mb-12"
            >
              <div className="relative w-full mb-2">
                <motion.div
                  className="mt-4 basis-3/5 cursor-pointer relative w-44 h-44 mx-auto rounded-full bg-neutral-300 dark:bg-neutral-700"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 },
                  }}
                >
                  {category.image ? (
                    <Image
                      className="object-contain object-center"
                      src={category.image}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
                      alt={category.id}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-neutral-700 dark:text-neutral-300">
                      <h1 className="text-xs italic">No Image</h1>{" "}
                    </div>
                  )}
                </motion.div>
              </div>
              <h1 className="text-center text-lg font-bold px-3">
                {category.name}
              </h1>
            </motion.div>
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