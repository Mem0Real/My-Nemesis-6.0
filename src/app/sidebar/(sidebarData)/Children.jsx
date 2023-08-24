"use client";
import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";
import { useSidebarContext } from "../SideBarComponent";
import { useIcons } from "@/app/utils/CustomIcons";
import Products from "./Products";

export default function Children({ category, parent }) {
  const {
    children,
    openChild,
    openProduct,
    buttonVariants,
    childSideVariants,
    childItemVariants,
    toggleProduct,
    closeSidebars,
  } = useSidebarContext();
  const { RightArrowIcon } = useIcons();
  return (
    <AnimatePresence>
      {openChild?.id === parent && openChild?.open === true && (
        <motion.aside
          layout="position"
          key="childSb"
          animate={
            openProduct
              ? {
                  height: "max-content",
                }
              : {
                  height: "max-content",
                }
          }
          exit={{
            transition: {
              delay: 0.5,
              duration: 0.3,
            },
          }}
          className="border border-x-0 border-neutral-700 dark:border-neutral-500 rounded-lg h-fit z-20"
        >
          <motion.div
            key="childContainer"
            className="flex flex-col items-center justify-start gap-4"
            initial="closedChild"
            animate="openChild"
            exit="closedChild"
            variants={childSideVariants}
          >
            {children.map(
              ({ id, ParentId }) =>
                openChild?.id === ParentId && (
                  <motion.div
                    key={id}
                    variants={childItemVariants}
                    className=" px-2 capitalize w-full"
                  >
                    <motion.div className="flex items-center justify-between">
                      <Link href={`/catalogue/${category}/${parent}/${id}`}>
                        {id}
                      </Link>
                      <motion.button
                        onClick={() => toggleProduct(id)}
                        animate={
                          openProduct?.id === id && openProduct?.open
                            ? "opened"
                            : "closed"
                        }
                        initial="closed"
                        variants={buttonVariants}
                      >
                        {RightArrowIcon}
                      </motion.button>
                    </motion.div>
                    <Products category={category} parent={parent} child={id} />
                  </motion.div>
                )
            )}
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
