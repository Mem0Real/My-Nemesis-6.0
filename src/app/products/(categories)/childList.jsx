"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useProductListContext } from "../productList";

export default function ChildList({ parentId, children }) {
  const { childDrop, contentVariants } = useProductListContext();

  return (
    <AnimatePresence>
      {childDrop.id === parentId && childDrop.open === true && (
        <motion.div
          className={`flex flex-col items-center gap-1 bg-neutral-300/80 dark:bg-neutral-700/80`}
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
                <div className="flex items-center text-sm gap-3">
                  <input
                    type="checkbox"
                    name="cat"
                    onChange={() => handleSelection(null, child.id)}
                    className="ml-3 self-start"
                  />
                  <h1 className="self-center">{child.id}</h1>
                </div>
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
