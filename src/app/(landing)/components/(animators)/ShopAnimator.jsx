"use client";

import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";

export default function ShopAnimator({ category, children, key }) {
  return (
    <motion.div
      initial={{ scale: 0.7, y: 50, opacity: 0 }}
      exit={{ scale: 0.7, y: 50, opacity: 0 }}
      whileInView={{ scale: [1.2, 1], y: 0, opacity: 1 }}
      // viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      key={category.id}
      className="flex flex-col gap-6 items-center justify-center w-full md:w-80 lg:w-60 mx-auto mb-12"
    >
      <Link className="relative w-full mb-2" href={`/catalogue/${category.id}`}>
        <motion.div
          className="mt-4 basis-3/5 cursor-pointer relative w-44 h-44 mx-auto rounded-full bg-neutral-300 dark:bg-neutral-700"
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2 },
          }}
        >
          {category.image ? (
            children
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-neutral-700 dark:text-neutral-300">
              <h1 className="text-xs italic">No Image</h1>{" "}
            </div>
          )}
        </motion.div>
      </Link>
      <Link href={`/catalogue/${category.id}`}>
        <h1 className="text-center text-lg font-bold px-3">{category.name}</h1>
      </Link>
    </motion.div>
  );
}
