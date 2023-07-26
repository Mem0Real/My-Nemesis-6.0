"use client";

import { useState, useEffect, createContext, useContext, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useIcons } from "../utils/CustomIcons";
import Link from "next/link";
import Categories from "./(sidebarData)/Categories";

const SidebarContext = createContext({});

export default function SideBarComponent({ data }) {
  // const [open, cycleOpen] = useCycle(false, true);
  const [openCategory, setOpenCategory] = useState(false);

  const sideBarRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!sideBarRef.current.contains(e.target)) {
        setOpenCategory(() => false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const [openParent, setOpenParent] = useState({ id: null, open: false });
  const [openChild, setOpenChild] = useState({ id: null, open: false });
  const [openProduct, setOpenProduct] = useState({ id: null, open: false });

  const categories = data[0];
  const parents = data[1];
  const children = data[2];
  const products = data[3];

  const { RightArrowIcon } = useIcons();

  const buttonVariants = {
    open: {
      right: 0,
      rotate: -180,
      borderTopWidth: "1px",
      borderLeftWidth: "1px",
      borderRadius: "6px",
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
    close: {
      right: -30,
      rotate: 0,
      transition: {
        delay: 0.5,
        ease: "easeInOut",
        duration: 0.3,
      },
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRadius: "0 0 6px 0",
    },
    opened: {
      rotate: -90,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
    closed: {
      rotate: 90,
      transition: {
        delay: 0.5,
        ease: "easeInOut",
        duration: 0.3,
      },
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

  const toggleCategory = () => {
    setOpenCategory((prev) => !prev);
    closeSidebars();
  };

  const toggleParent = (id) => {
    if (openParent) {
      if (openParent.id === id) {
        if (openParent?.open) {
          setOpenParent((prev) => ({ ...prev, open: false }));
          setOpenChild(null);
          setOpenProduct(null);
        } else {
          setOpenParent((prev) => ({ ...prev, open: true }));
        }
      } else {
        setOpenParent((prev) => ({ id: id, open: true }));
      }
    } else {
      setOpenParent(() => ({ id: id, open: true }));
    }
  };

  const toggleChild = (id) => {
    if (openChild) {
      if (openChild.id === id) {
        if (openChild?.open) {
          setOpenChild((prev) => ({ ...prev, open: false }));
          setOpenProduct(null);
        } else {
          setOpenChild((prev) => ({ ...prev, open: true }));
        }
      } else {
        setOpenChild(() => ({ id: id, open: true }));
      }
    } else {
      setOpenChild(() => ({ id: id, open: true }));
    }
  };

  const toggleProduct = (id) => {
    if (openProduct) {
      if (openProduct.id === id) {
        openProduct?.open
          ? setOpenProduct((prev) => ({ ...prev, open: false }))
          : setOpenProduct((prev) => ({ ...prev, open: true }));
      } else {
        setOpenProduct(() => ({ id: id, open: true }));
      }
    } else {
      setOpenProduct(() => ({ id: id, open: true }));
    }
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
    <SidebarContext.Provider
      value={{
        categories,
        parents,
        children,
        products,
        openCategory,
        openParent,
        openChild,
        openProduct,
        buttonVariants,
        sideVariants,
        itemVariants,
        parentSideVariants,
        parentItemVariants,
        childSideVariants,
        childItemVariants,
        productSideVariants,
        productItemVariants,
        toggleParent,
        toggleChild,
        toggleProduct,
        closeSidebars,
      }}
    >
      <motion.main
        className="flex flex-col lg:flex items-start"
        ref={sideBarRef}
      >
        <motion.div
          className="btn-container absolute top-0 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-md border border-neutral-500 pt-1.5 px-1"
          animate={openCategory ? "open" : "close"}
          initial="close"
          variants={buttonVariants}
        >
          <motion.button onClick={toggleCategory}>
            {RightArrowIcon}
          </motion.button>
        </motion.div>
        <Categories />
      </motion.main>
    </SidebarContext.Provider>
  );
}

export const useSidebarContext = () => useContext(SidebarContext);
