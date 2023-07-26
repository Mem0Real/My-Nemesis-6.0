"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useProductListContext } from "../productList";
import { useIcons } from "@/app/utils/CustomIcons";
import ParentList from "./parentList";

export default function CategoryList() {
  const {
    categories,
    categoryDrop,
    parentDrop,
    btnVariants,
    contentVariants,
    toggleParent,
    handleSelection,
  } = useProductListContext();

  const { RightArrowIcon } = useIcons();

  return (
    <AnimatePresence>
      {categoryDrop && (
        <motion.div
          className={`flex flex-col items-start gap-3 w-[95%]`}
          initial="closed"
          animate={categoryDrop ? "opened" : "closed"}
          exit="closed"
          variants={contentVariants}
        >
          {categories.map((category) => {
            return (
              <div key={category.id} className="w-full flex flex-col px-3">
                <div className="flex items-center justify-between h-5 text-sm">
                  <input
                    type="checkbox"
                    name="cat"
                    onChange={() => handleSelection(category.id)}
                  />
                  <h1>{category.id}</h1>
                  <motion.button
                    className="text-sm text-start text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400"
                    onClick={() => toggleParent(category.id)}
                    animate={
                      parentDrop.id === category.id && parentDrop.open === true
                        ? "open"
                        : "close"
                    }
                    exit="close"
                    variants={btnVariants}
                  >
                    {RightArrowIcon}
                  </motion.button>
                </div>
                <ParentList
                  categoryId={category.id}
                  parents={category.parents}
                />
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
