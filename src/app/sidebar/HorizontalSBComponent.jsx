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
  const [openChild, setOpenChild] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);

  const categories = data[0];
  const parents = data[1];
  const children = data[2];
  const products = data[3];

  const { RightArrowIcon } = useIcons();

  const buttonVariants = {
    open: {
      top: -20,
      right: 0,
      rotate: -180,
      borderLeftWidth: "1px",
      borderRadius: "6px",
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
    close: {
      top: 0,
      right: -30,
      rotate: 0,
      transition: {
        delay: 0.5,
        ease: "easeInOut",
        duration: 0.3,
      },
      borderLeftWidth: 0,
      borderRadius: "0 6px 6px 0",
    },
  };
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
  const parentSideVariants = {
    closedParent: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    openParent: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  };
  const parentItemVariants = {
    closedParent: {
      opacity: 0,
    },
    openParent: { opacity: 1 },
  };
  const childSideVariants = {
    closedChild: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    openChild: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  };
  const childItemVariants = {
    closedChild: {
      opacity: 0,
    },
    openChild: { opacity: 1 },
  };
  const productSideVariants = {
    closedProduct: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    openProduct: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  };
  const productItemVariants = {
    closedProduct: {
      opacity: 0,
    },
    openProduct: { opacity: 1 },
  };

  const toggleSidebar = () => {
    cycleOpen();
    closeSidebars();
  };

  const closeSidebars = () => {
    setOpenParent();
    setOpenChild();
    setOpenProduct();
  };
  const closeChildren = (entry) => {
    switch (entry) {
      case "categories": {
        openParent && setOpenParent(null);
        openChild && setOpenChild(null);
        openProduct && setOpenProduct(null);
      }

      case "parents": {
        openChild && setOpenChild(null);
        openProduct && setOpenProduct(null);
      }

      case "children": {
        openProduct && setOpenProduct(null);
      }
    }
  };
  return (
    <motion.main className="relative flex w-fit h-fit">
      <motion.div
        className="btn-container absolute top-3 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-md border border-neutral-500 pt-1.5 px-1"
        animate={open ? "open" : "close"}
        initial="closed"
        variants={buttonVariants}
      >
        <motion.button onClick={toggleSidebar}>{RightArrowIcon}</motion.button>
      </motion.div>
      {/* Categories */}
      <AnimatePresence>
        {open && (
          <motion.aside
            onHoverStart={() => closeChildren("categories")}
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            exit={{
              width: 0,
              transition: { delay: 0.5, duration: 0.3 },
            }}
            className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-700 dark:border-neutral-500 rounded-xl rounded-l-none min-h-72 h-fit"
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
                  whileHover={{ scale: 1.05 }}
                  variants={itemVariants}
                  className=" ps-2 capitalize"
                  onHoverStart={() => setOpenParent(id)}
                >
                  <Link href={`/catalogue/${id}`}>{id}</Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Parents */}
      <AnimatePresence>
        {openParent && (
          <motion.aside
            key="parentSb"
            onHoverStart={() => closeChildren("parents")}
            initial={{ width: 0 }}
            animate={
              openChild
                ? {
                    width: 150,
                    height: "max-content",
                    borderRightWidth: "0px",
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                  }
                : {
                    width: 150,
                    height: "max-content",
                    borderRightWidth: "1px",
                    borderTopRightRadius: "8px",
                    borderBottomRightRadius: "8px",
                  }
            }
            exit={{
              width: 0,
              transition: { delay: 0.5, duration: 0.3 },
            }}
            className="absolute left-[120px] top-3 bg-neutral-100 dark:bg-neutral-900 border border-l-0 border-neutral-700 dark:border-neutral-500 rounded-r-lg h-fit"
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
                  openParent === CategoryId && (
                    <motion.div
                      key={id}
                      whileHover={{ scale: 1.05 }}
                      variants={parentItemVariants}
                      className=" ps-2 capitalize"
                      onHoverStart={() => setOpenChild(id)}
                    >
                      <Link href={`/catalogue/${CategoryId}/${id}`}>{id}</Link>
                    </motion.div>
                  )
              )}
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Children */}
      <AnimatePresence>
        {openChild && (
          <motion.aside
            layout
            onHoverStart={() => closeChildren("children")}
            key="childSb"
            initial={{ width: 0 }}
            animate={
              openProduct
                ? {
                    width: 150,
                    height: "max-content",
                    borderRightWidth: "0px",
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                  }
                : {
                    width: 150,
                    height: "max-content",
                    borderRightWidth: "1px",
                    borderTopRightRadius: "8px",
                    borderBottomRightRadius: "8px",
                  }
            }
            exit={{
              width: 0,
              transition: { delay: 0.5, duration: 0.3 },
              height: 0,
            }}
            className="absolute left-[19.3em] top-3 bg-neutral-100 dark:bg-neutral-900 border border-l-0 border-neutral-700 dark:border-neutral-500 h-fit z-20"
          >
            <motion.div
              key="childContainer"
              className="flex flex-col items-center justify-start gap-4 h-fit"
              initial="closedChild"
              animate="openChild"
              exit="closedChild"
              variants={childSideVariants}
            >
              {children.map(
                ({ id, ParentId }) =>
                  openChild === ParentId && (
                    <motion.div
                      key={id}
                      whileHover={{ scale: 1.05 }}
                      variants={childItemVariants}
                      className=" ps-2 capitalize"
                      onHoverStart={() => setOpenProduct(id)}
                    >
                      <Link href={`/catalogue/${openParent}/${ParentId}/${id}`}>
                        {id}
                      </Link>
                    </motion.div>
                  )
              )}
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Items */}
      <AnimatePresence>
        {openProduct && (
          <motion.aside
            layout
            key="productSb"
            initial={{ width: 0, height: 0 }}
            animate={{
              width: 200,
              height: "max-content",
              transition: { duration: 0.5 },
            }}
            exit={{
              width: 0,
              height: 0,
              transition: { delay: 0.5, duration: 0.3 },
            }}
            className="absolute left-[29.8em] top-3 z-10 bg-neutral-100 dark:bg-neutral-900 border border-neutral-700 dark:border-neutral-500 rounded-r-lg py-5 h-max"
          >
            <motion.div
              key="productContainer"
              className="flex flex-col items-start justify-center gap-4"
              initial="closedProduct"
              animate="openProduct"
              exit="closedProduct"
              variants={productSideVariants}
            >
              {products.map(
                ({ id, name, ChildId }) =>
                  openProduct === ChildId && (
                    <motion.div
                      key={id}
                      whileHover={{ scale: 1.05 }}
                      variants={productItemVariants}
                      className=" ps-2 capitalize"
                    >
                      <Link
                        href={`/catalogue/${openParent}/${openChild}/${ChildId}/${id}`}
                      >
                        {name}
                      </Link>
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
