"use client";

import { useState } from "react";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { useIcons } from "../utils/CustomIcons";
import Link from "next/link";

const links = [
  { name: "Home", to: "#", id: 1 },
  { name: "About", to: "#", id: 2 },
  { name: "Blog", to: "#", id: 3 },
  { name: "Contact", to: "#", id: 4 },
];

export default function SideBarComponent({ data }) {
  const [open, cycleOpen] = useCycle(false, true);

  const [openParent, setOpenParent] = useState(false);

  const categories = data[0];
  const parents = data[1];

  const { RightArrowIcon } = useIcons();

  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: 1,
      },
    },
  };
  const itemVariants = {
    closed: {
      opacity: 0,
    },
    open: { opacity: 1 },
  };
  const buttonVariants = {
    close: {
      top: 0,
      right: -40,
      rotate: 0,
      transition: {
        delay: 0.5,
      },
    },
    open: {
      top: -20,
      right: 0,
      rotate: 180,
    },
  };

  const parentItemVariants = {
    closeParent: {
      opacity: 0,
    },
    openParent: { opacity: 1 },
  };
  const parentSideVariants = {
    closedParent: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: -1,
      },
    },
    openParent: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  };

  const toggleSidebar = () => {
    cycleOpen();
    setOpenParent();
  };
  return (
    <motion.main className="relative flex w-fit h-fit">
      <motion.div
        layout
        className="btn-container absolute top-3 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-md border border-neutral-500 pt-1.5 px-1"
        animate={open ? "open" : "close"}
        initial="closed"
        variants={buttonVariants}
      >
        <motion.button onClick={toggleSidebar}>{RightArrowIcon}</motion.button>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.aside
            layout
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            exit={{
              width: 0,
              transition: { delay: 0.5, duration: 0.3 },
            }}
            className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-700 dark:border-neutral-500 rounded-xl rounded-l-none min-h-72 h-fit"
          >
            <motion.div
              layout
              className="flex flex-col items-start justify-center gap-4"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
              onHoverStart={() => setOpenParent()}
            >
              <motion.div
                layout
                whileHover={{ scale: 1.05 }}
                className="mt-3 self-center"
                variants={itemVariants}
              >
                <Link href="/collection">Browse all</Link>
              </motion.div>
              {categories.map(({ id }) => (
                <motion.div
                  layout
                  key={id}
                  whileHover={{ scale: 1.05 }}
                  variants={itemVariants}
                  className=" ps-2 capitalize"
                  onHoverStart={() => setOpenParent(id)}
                >
                  <Link href={`/collection/${id}`}>{id}</Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {openParent && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{ width: 150 }}
            exit={{
              width: 0,
              transition: { delay: 0.5, duration: 0.3 },
            }}
            className="absolute left-[120px] top-3 bg-neutral-100 dark:bg-neutral-900 border border-l-0 border-neutral-700 dark:border-neutral-500 rounded-r-lg h-fit"
          >
            <motion.div
              className="flex flex-col items-center justify-start gap-4"
              initial="closedParent"
              animate="openParent"
              exit="closedParent"
              variants={parentSideVariants}
            >
              {parents.map(
                ({ id, CategoryId }) =>
                  openParent === CategoryId && (
                    <motion.div
                      key={id}
                      whileHover={{ scale: 1.05 }}
                      variants={parentItemVariants}
                      className=" ps-2 capitalize"
                    >
                      <Link href={`/collection/${CategoryId}/${id}`}>{id}</Link>
                    </motion.div>
                  )
              )}
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
