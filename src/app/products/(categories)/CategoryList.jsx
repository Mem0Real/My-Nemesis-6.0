"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useProductListContext } from "../ProductList";

export default function CategoryList() {
  const {
    menu,
    categoryDrop,
    contentVariants,
    filterCatData,
    handleSelection,
  } = useProductListContext();

  return (
    <AnimatePresence>
      {categoryDrop && (
        <motion.div
          className={`flex flex-col items-start gap-2 w-full text-sm lg:mt-4 pb-4`}
          initial="closed"
          animate={categoryDrop ? "opened" : "closed"}
          exit="closed"
          variants={contentVariants}
        >
          {menu.map((category) => {
            return (
              <div
                key={category.id}
                className="flex items-center w-full gap-2 text-sm px-2"
              >
                <input
                  type="checkbox"
                  name="cat"
                  checked={filterCatData?.includes(category.id)}
                  onChange={() => handleSelection(category.id)}
                />
                <h1>{category.id}</h1>
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
