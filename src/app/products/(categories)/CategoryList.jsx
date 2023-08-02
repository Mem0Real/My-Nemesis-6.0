"use client";

import { useState, useEffect } from "react";

import { hasCookie, getCookie } from "cookies-next";

import { motion, AnimatePresence } from "framer-motion";
import { useProductListContext } from "../ProductList";
import { useIcons } from "@/app/utils/CustomIcons";
import ParentList from "./ParentList";

export default function CategoryList() {
  const [check, setCheck] = useState([]);
  const [checked, setChecked] = useState(false);

  // const cookieStore = parseCookies();

  const {
    menu,
    categoryDrop,
    parentDrop,
    btnVariants,
    contentVariants,
    toggleParent,
    filterCatData,
    handleSelection,
  } = useProductListContext();

  // useEffect(() => {
  //   let filter;
  //   if (cookieStore.FilterCat && cookieStore.FilterCat !== undefined)
  //     filter = JSON.parse(cookieStore.FilterCat);

  //   filter && setCheck(() => filter);
  //   console.log(filter);
  // }, []);

  const { RightArrowIcon } = useIcons();

  return (
    <AnimatePresence>
      {categoryDrop && (
        <motion.div
          className={`flex flex-col items-start gap-2 w-full text-sm`}
          initial="closed"
          animate={categoryDrop ? "opened" : "closed"}
          exit="closed"
          variants={contentVariants}
        >
          {menu.map((category) => {
            return (
              <div
                key={category.id}
                className="w-full flex flex-col px-1 gap-5 md:gap-2"
              >
                <div className="flex items-center justify-between text-sm">
                  <input
                    type="checkbox"
                    name="cat"
                    checked={filterCatData?.includes(category.id)}
                    onChange={() => handleSelection(category.id)}
                  />
                  <h1>{category.id}</h1>
                  <motion.button
                    className="text-sm text-start text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400"
                    onClick={() => toggleParent(category.id)}
                    animate={
                      parentDrop.id === category.id && parentDrop.open === true
                        ? "open"
                        : "close"
                    }
                    exit="close"
                    variants={btnVariants}
                  >
                    {RightArrowIcon}
                  </motion.button>
                </div>
                <ParentList
                  categoryId={category.id}
                  parents={category.parents}
                />
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
