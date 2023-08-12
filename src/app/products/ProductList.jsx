"use client";

import { useState, createContext, useContext, useEffect } from "react";

import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";

import FilterData from "./components/FilterData";
import Search from "./components/Search";
import Sort from "./components/Sort";
import ListData from "./components/ListData";
import Pagination from "./components/Pagination";

import useCustomRouter from "@/hooks/useCustomRouter";

const ProductListContext = createContext({});

export default function ProductList({ products, menu, totalPage, range }) {
  const [categoryDrop, showCategoryDrop] = useState(false);

  const [filterCatData, setFilterCatData] = useState([]);

  const [priceDrop, showPriceDrop] = useState(false);

  const { pushQuery } = useCustomRouter();

  // Update category dropdown state based on cookie data
  useEffect(() => {
    if (hasCookie("Product_CatDrop")) {
      const data = JSON.parse(getCookie("Product_CatDrop"));
      data && showCategoryDrop(true);
    } else showCategoryDrop(false);

    if (hasCookie("FilterCat")) {
      const filter = JSON.parse(getCookie("FilterCat"));
      setFilterCatData(filter);
    }
  }, []);

  useEffect(() => {
    if (filterCatData?.length > 0 && filterCatData !== undefined) {
      setCookie("FilterCat", filterCatData);
      pushQuery({ filter: filterCatData.toString() });
    } else {
      deleteCookie("FilterCat");
      pushQuery({ filter: "" });
    }
  }, [filterCatData, pushQuery]);

  // Update price dropdown state based on cookie data
  useEffect(() => {
    if (hasCookie("Product_PriceDrop")) {
      const data = JSON.parse(getCookie("Product_PriceDrop"));
      data && showPriceDrop(true);
    } else showPriceDrop(false);
  }, []);

  const toggleCategory = () => {
    showCategoryDrop((prev) => !prev);
    setCookie("Product_CatDrop", !categoryDrop);
  };

  const togglePrice = () => {
    showPriceDrop((prev) => !prev);
    setCookie("Product_PriceDrop", !priceDrop);
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

  const handleSelection = (cat = null) => {
    if (cat) {
      let newArray = [...filterCatData];
      if (newArray?.length > 0) {
        let prev = newArray.indexOf(cat);

        if (prev !== -1) newArray.splice(prev, 1);
        else newArray.push(cat);

        setFilterCatData(newArray);
        pushQuery({ filter: newArray.toString() });
      } else {
        newArray.push(cat);
        setFilterCatData(newArray);
        pushQuery({ filter: newArray.toString() });
      }
    }
  };

  return (
    <ProductListContext.Provider
      value={{
        menu,
        products,
        priceDrop,
        categoryDrop,
        btnVariants,
        contentVariants,
        filterCatData,
        toggleCategory,
        togglePrice,
        handleSelection,
        totalPage,
        range,
      }}
    >
      <div className="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 min-h-screen flex flex-col items-center text-sm py-5">
        <div className="w-full flex flex-col items-center justify-center py-16 md:py-20 lg:py-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold">
            Products
          </h1>
        </div>
        <div className="flex flex-col gap-6 w-[95%]">
          <div className="flex items-center justify-evenly md:justify-between gap-4 px-2 lg:px-5">
            <Search />
            <Sort />
          </div>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-evenly w-full">
            <div className="w-full lg:basis-[20%] self-start">
              <FilterData />
            </div>
            <div className="w-full lg:basis-4/5 mx-auto flex flex-col justify-between">
              <ListData />
              <div className="self-center">{totalPage && <Pagination />}</div>
            </div>
          </div>
        </div>
      </div>
    </ProductListContext.Provider>
  );
}

export const useProductListContext = () => useContext(ProductListContext);
