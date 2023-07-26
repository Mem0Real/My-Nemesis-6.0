"use client";

import { useState, createContext, useContext, useEffect } from "react";
import { useIcons } from "../utils/CustomIcons";
import { motion, AnimatePresence } from "framer-motion";
import CategoryList from "./(categories)/categoryList";

const ProductListContext = createContext({});

export default function ProductList({ data }) {
  const [categoryDrop, showCategoryDrop] = useState(false);
  const [parentDrop, setParentDrop] = useState(false);
  const [childDrop, setChildDrop] = useState(false);

  const [filterCatData, setFilterCatData] = useState([]);
  const [filterParData, setFilterParData] = useState([]);
  const [filterChiData, setFilterChiData] = useState([]);

  const [priceDrop, showPriceDrop] = useState(false);

  useEffect(() => {
    console.log("Categories: ", filterCatData);
  }, [filterCatData]);

  const [categories, parents, children, products] = data;
  const { RightArrowIcon } = useIcons();

  const toggleCategory = () => {
    showCategoryDrop((prev) => !prev);
  };

  const toggleParent = (id) => {
    if (!parentDrop) {
      setParentDrop((prev) => ({ id: id, open: !prev.open }));
    } else {
      if (parentDrop.id === id) {
        setParentDrop((prev) => ({ ...prev, open: !prev.open }));
        console.log(!parentDrop.open);
      } else {
        setParentDrop(() => ({ id: id, open: true }));
      }
    }
  };

  const toggleChild = (id) => {
    if (!childDrop) {
      setChildDrop((prev) => ({ id: id, open: !prev.open }));
    } else {
      if (childDrop.id === id) {
        setChildDrop((prev) => ({ ...prev, open: !prev.open }));
        console.log(!childDrop.open);
      } else {
        setChildDrop(() => ({ id: id, open: true }));
      }
    }
  };
  const btnVariants = {
    open: {
      rotate: 90,
      x: 0.5,
      y: 0.5,
    },
    close: {
      rotate: 0,
      x: 0,
      y: 0,
    },
  };

  const contentVariants = {
    opened: {
      y: 0,
      opacity: 1,

      transition: {
        duration: 0.2,
        ease: "linear",
        staggerChildren: 0.05,
        staggerDirection: 1,
      },
    },
    closed: {
      y: "-15px",
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "linear",
        staggerChildren: 0.05,
        staggerDirection: 1,
      },
    },
  };

  const handleSelection = (cat = null, par = null, chi = null) => {
    if (cat) {
      setFilterCatData((prev) => [...prev, { id: cat }]);
    }
    if (par) {
      setFilterParData((prev) => [...prev, { id: par }]);
    }
    if (chi) {
      setFilterChiData((prev) => [...prev, { id: chi }]);
    }
  };
  return (
    <div className="bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 min-h-screen flex flex-col items-center px-5 ">
      <div className="h-48 w-full flex flex-col items-center justify-center">
        <h1 className="text-5xl font-semibold">Products</h1>
      </div>
      <div className="flex items-center w-full gap-6">
        <ProductListContext.Provider
          value={{
            categories,
            parents,
            children,
            categoryDrop,
            parentDrop,
            childDrop,
            btnVariants,
            contentVariants,
            toggleParent,
            toggleChild,
            handleSelection,
          }}
        >
          {/* Filter */}
          <div className="basis-1/5 flex flex-col items-center gap-5">
            <h1 className="text-2xl self-start font-light ">Filter by</h1>
            {/* Dropdownbtns */}
            <div className="flex items-center justify-between w-full border-y border-neutral-400 px-2 h-12 cursor-pointer text-sm">
              <h1>Category</h1>
              <motion.button
                className="text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400"
                onClick={toggleCategory}
                initail="close"
                animate={categoryDrop ? "open" : "close"}
                exit="close"
                variants={btnVariants}
              >
                {RightArrowIcon}
              </motion.button>
            </div>

            <CategoryList />

            <div className="flex items-center justify-between w-full border-y border-neutral-400 px-2 h-12 cursor-pointer text-sm">
              <h1>Price</h1>
              <motion.button
                className="text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400"
                onClick={() => showPriceDrop((prev) => !prev)}
                initail="close"
                animate={priceDrop ? "open" : "close"}
                exit="close"
                variants={btnVariants}
              >
                {RightArrowIcon}
              </motion.button>
            </div>
            <AnimatePresence>
              {priceDrop && (
                <motion.div
                  className={`w-full`}
                  initial="closed"
                  animate={priceDrop ? "opened" : "closed"}
                  exit="closed"
                  variants={contentVariants}
                >
                  <h1>hi</h1>
                  <h1>hi</h1>
                  <h1>hi</h1>
                  <h1>hi</h1>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ProductListContext.Provider>
        {/* Products */}
        <div className="basis-4/5 flex flex-col items-center">
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
        </div>
      </div>
    </div>
  );
}

export const useProductListContext = () => useContext(ProductListContext);
