"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useProductListContext } from "../productList";
import { useIcons } from "@/app/utils/CustomIcons";
import ChildList from "./childList";

export default function ParentList({ categoryId, parents }) {
  const {
    parentDrop,
    childDrop,
    btnVariants,
    contentVariants,
    toggleChild,
    handleSelection,
  } = useProductListContext();

  const { RightArrowIcon } = useIcons();

  return (
    <AnimatePresence>
      {parentDrop.id === categoryId && parentDrop.open === true && (
        <motion.div
          className={`flex flex-col items-start gap-3 w-[93%] mx-auto my-2`}
          initial="closed"
          animate={
            parentDrop.id === categoryId && parentDrop.open === true
              ? "opened"
              : "closed"
          }
          exit="closed"
          variants={contentVariants}
        >
          {parents.map((parent) => {
            return (
              <div key={parent.id} className="w-full flex flex-col px-1">
                <div className="flex items-center justify-between h-4 text-sm">
                  <input
                    type="checkbox"
                    name="cat"
                    onChange={() => handleSelection(null, parent.id)}
                    className="ml-3"
                  />
                  <h1>{parent.id}</h1>
                  <motion.button
                    className="text-sm text-start text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400"
                    onClick={() => toggleChild(parent.id)}
                    animate={
                      childDrop.id === parent.id && childDrop.open === true
                        ? "open"
                        : "close"
                    }
                    exit="close"
                    variants={btnVariants}
                  >
                    {RightArrowIcon}
                  </motion.button>
                </div>
                <ChildList parentId={parent.id} children={parent.children} />
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
