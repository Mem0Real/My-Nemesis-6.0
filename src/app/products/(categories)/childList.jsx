"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useProductListContext } from "../productList";

export default function ChildList({ parentId, children }) {
  const { childDrop, contentVariants } = useProductListContext();

  return (
    <AnimatePresence>
      {childDrop.id === parentId && childDrop.open === true && (
        <motion.div
          className={`flex flex-col items-start gap-3 w-[90%] mx-auto my-2`}
          initial="closed"
          animate={
            childDrop.id === parentId && childDrop.open === true
              ? "opened"
              : "closed"
          }
          exit="closed"
          variants={contentVariants}
        >
          {children.map((child) => {
            return (
              <div key={child.id} className="w-full flex flex-col">
                <div className="flex items-center justify-between w-full h-4 text-sm">
                  <h1>{child.id}</h1>
                  {/* <motion.button
                    className="text-sm text-start text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400"
                    onClick={toggleChild}
                    animate={childDrop.id === parent.id && childDrop.open === true ? "open" : "close"}
                    exit="close"
                    variants={btnVariants}
                  >
                    {RightArrowIcon}
                  </motion.button> */}
                </div>
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
