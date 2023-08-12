"use client";

import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";
import { useSidebarContext } from "../SideBarComponent";
import { useIcons } from "@/app/utils/CustomIcons";
import Parents from "./Parents";

export default function Categories() {
  const {
    categories,
    openCategory,
    openParent,
    buttonVariants,
    sideVariants,
    itemVariants,
    toggleParent,
  } = useSidebarContext();
  const { RightArrowIcon } = useIcons();

  return (
    <AnimatePresence>
      {openCategory && (
        <motion.aside
          initial={{ width: 0 }}
          animate={{ width: 200 }}
          exit={{
            width: 0,
            transition: { delay: 0.5, duration: 0.3 },
          }}
          className="bg-transparent backdrop-blur-lg border-b border-purple-700 dark:border-purple-500 rounded-lg rounded-l-none min-h-72 h-fit"
        >
          <motion.div
            className="flex flex-col items-start justify-center gap-4"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sideVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mt-3 self-center"
              variants={itemVariants}
            >
              <Link href="/catalogue">Browse all</Link>
            </motion.div>
            {categories.map(({ id }) => (
              <motion.div
                key={id}
                variants={itemVariants}
                className="capitalize w-full"
              >
                <motion.div className="flex items-center justify-between gap-12 px-2">
                  <Link href={`/catalogue/${id}`}>{id}</Link>
                  <motion.button
                    onClick={() => toggleParent(id)}
                    animate={
                      openParent?.id === id && openParent?.open
                        ? "opened"
                        : "closed"
                    }
                    variants={buttonVariants}
                    initial="closed"
                  >
                    {RightArrowIcon}
                  </motion.button>
                </motion.div>
                <Parents category={id} />
              </motion.div>
            ))}
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
