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

export default function ProductList({ products, menu, totalPage }) {
  const [categoryDrop, showCategoryDrop] = useState(false);
  const [parentDrop, setParentDrop] = useState(false);
  const [childDrop, setChildDrop] = useState(false);

  const [filterCatData, setFilterCatData] = useState([]);
  const [filterParData, setFilterParData] = useState([]);
  const [filterChiData, setFilterChiData] = useState([]);

  const [priceDrop, showPriceDrop] = useState(false);

  const { pushQuery } = useCustomRouter();
  // const cookieStore = parseCookies();

  useEffect(() => {
    // let data, filter;
    // if (cookieStore.CategoryDrop && cookieStore.CategoryDrop !== undefined)
    //   data = JSON.parse(cookieStore.CategoryDrop);

    // if (cookieStore.FilterCat && cookieStore.FilterCat !== undefined)
    //   filter = JSON.parse(cookieStore.FilterCat);

    // data && showCategoryDrop(() => data);
    // filter && setFilterCatData(() => filter);

    if (hasCookie("Product_CatDrop")) showCategoryDrop(true);
    else showCategoryDrop(false);

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
  }, [filterCatData]);

  const toggleCategory = () => {
    showCategoryDrop((prev) => !prev);
    setCookie("Product_CatDrop", !categoryDrop);
  };

  const toggleParent = (id) => {
    if (!parentDrop) {
      setParentDrop((prev) => ({ id: id, open: !prev.open }));
    } else {
      if (parentDrop.id === id) {
        setParentDrop((prev) => ({ ...prev, open: !prev.open }));
        // console.log(!parentDrop.open);
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
        // console.log(!childDrop.open);
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
      //   if (filterCatData?.length > 0) {
      //     const prevCatData = filterCatData.find((item) => item.id === cat);
      //     if (prevCatData) {
      //       let catData = filterCatData.map((data) => {
      //         if (data.id === cat) {
      //           return { ...data, open: !data.open };
      //         }
      //         return data;
      //       });
      //       setFilterCatData(catData);
      //     } else {
      //       const newData = { id: cat, open: true };
      //       setFilterCatData((prev) => [...prev, newData]);
      //     }
      //   } else {
      //     let newEntry = [{ id: cat, open: true }];

      //     setFilterCatData(() => newEntry);
      //   }
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
    if (par) {
      let newArray = [...filterParData];
      if (newArray?.length > 0) {
        let prev = newArray.indexOf(par);

        if (prev !== -1) newArray.splice(prev, 1);
        else newArray.push(par);
        setFilterParData(newArray);
      } else {
        newArray.push(par);
        setFilterParData(newArray);
      }
    }
    if (chi) {
      let newArray = [...filterChiData];
      if (newArray?.length > 0) {
        let prev = newArray.indexOf(chi);

        if (prev !== -1) newArray.splice(prev, 1);
        else newArray.push(chi);
        setFilterChiData(newArray);
      } else {
        newArray.push(chi);
        setFilterChiData(newArray);
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
        parentDrop,
        childDrop,
        btnVariants,
        contentVariants,
        filterCatData,
        filterChiData,
        filterParData,
        toggleCategory,
        toggleParent,
        toggleChild,
        handleSelection,
        totalPage,
      }}
    >
      <div className="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 min-h-screen flex flex-col items-center text-sm">
        <div className="h-36 w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold">Products</h1>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <div className="flex items-center justify-evenly md:justify-between gap-4 px-2 lg:px-5">
            <Search />
            <Sort />
          </div>
          <div className="flex items-center justify-start w-full">
            <div className="basis-1/5 lg:basis-[13%] self-start md:ml-3 ">
              <FilterData />
            </div>
            <div className="basis-4/5 mx-auto flex flex-col justify-between">
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
