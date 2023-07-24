"use client";

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

  const categories = data[0];

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

  return (
    <main className="relative flex">
      <motion.div
        className="btn-container absolute top-3 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-md border border-neutral-500 pt-1.5 px-1"
        animate={open ? "open" : "close"}
        initial="closed"
        variants={buttonVariants}
      >
        <motion.button onClick={cycleOpen}>{RightArrowIcon}</motion.button>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{ width: 150 }}
            exit={{
              width: 0,
              transition: { delay: 0.5, duration: 0.3 },
            }}
            className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-700 dark:border-neutral-500 rounded-xl h-fit"
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
                <Link href="/collection">Browse all</Link>
              </motion.div>
              {categories.map(({ id }) => (
                <motion.div
                  key={id}
                  whileHover={{ scale: 1.05 }}
                  variants={itemVariants}
                  className=" ps-2 capitalize"
                >
                  <Link href={`/collection/${id}`}>{id}</Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </main>
  );
}
