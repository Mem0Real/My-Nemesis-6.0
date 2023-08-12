"use client";
import Link from "next/link";

import Children from "./Children";

import { motion, AnimatePresence } from "framer-motion";
import { useSidebarContext } from "../SideBarComponent";
import { useIcons } from "@/app/utils/CustomIcons";

export default function Parents({ category }) {
  const {
    parents,
    openParent,
    openChild,
    buttonVariants,
    parentSideVariants,
    parentItemVariants,
    toggleChild,
  } = useSidebarContext();
  const { RightArrowIcon } = useIcons();
  return (
    <AnimatePresence>
      {openParent?.id === category && openParent?.open === true && (
        <motion.aside
          layout="position"
          key="parentSb"
          animate={
            openChild
              ? {
                  height: "max-content",
                }
              : {
                  height: "max-content",
                }
          }
          exit={{
            transition: { delay: 0.5, duration: 0.3 },
          }}
          className="bg-transparent border border-x-0 border-neutral-700 dark:border-neutral-500 rounded-lg h-fit"
        >
          <motion.div
            key="parentContainer"
            className="flex flex-col items-center justify-start gap-4"
            initial="closedParent"
            animate="openParent"
            exit="closedParent"
            variants={parentSideVariants}
          >
            {parents.map(
              ({ id, CategoryId }) =>
                openParent?.id === CategoryId && (
                  <motion.div
                    key={id}
                    variants={parentItemVariants}
                    className="px-4 capitalize w-full"
                  >
                    <motion.div className="flex items-center justify-between">
                      <Link href={`/catalogue/${category}/${id}`}>{id}</Link>
                      <motion.button
                        onClick={() => toggleChild(id)}
                        animate={
                          openChild?.id === id && openChild?.open
                            ? "opened"
                            : "closed"
                        }
                        initial="closed"
                        variants={buttonVariants}
                      >
                        {RightArrowIcon}
                      </motion.button>
                    </motion.div>
                    <Children category={category} parent={id} />
                  </motion.div>
                )
            )}
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
