"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useProductListContext } from "../ProductList";
import { useIcons } from "@/app/utils/CustomIcons";
import ChildList from "./ChildList";

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
          className={`flex flex-col items-center gap-1 bg-neutral-200/80 dark:bg-neutral-800/80`}
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
              <div key={parent.id} className="flex flex-col w-full gap-2">
                <div className="flex items-center justify-between text-sm">
                  <input
                    type="checkbox"
                    name="cat"
                    onChange={() => handleSelection(null, parent.id)}
                    className="ml-2"
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
                <ChildList
                  parentId={parent.id}
                  childrenData={parent.children}
                />
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
