"use client";

import { useState, createContext, useContext, useEffect } from "react";
import Image from "next/image";

import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";

import FilterData from "./components/FilterData";
import Search from "./components/Search";
import Sort from "./components/Sort";
import ListData from "./components/ListData";
import Pagination from "./components/Pagination";

import { motion } from "framer-motion";

import useCustomRouter from "@/hooks/useCustomRouter";
import CarouselHolder from "../catalogue/components/CarouselHolder";

const ProductListContext = createContext({});

export default function ProductList({ products, menu, totalPage, range }) {
	const [categoryDrop, showCategoryDrop] = useState(false);

	const [filterCatData, setFilterCatData] = useState([]);

	const [priceDrop, showPriceDrop] = useState(false);
	const [filterDrop, showFilterDrop] = useState(false);

	const { pushQuery } = useCustomRouter();

	// Update filter dropdown state based on cookie data

	useEffect(() => {
		if (hasCookie("Filter_Drop")) {
			const filter = JSON.parse(getCookie("Filter_Drop"));
			filter && showFilterDrop(filter);
		} else showFilterDrop(false);
	}, []);

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

	const toggleFilter = () => {
		showFilterDrop((prev) => !prev);
		setCookie("Filter_Drop", !filterDrop);
	};

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

	// TODO Show the product list more
	return (
		<ProductListContext.Provider
			value={{
				menu,
				products,
				filterDrop,
				categoryDrop,
				priceDrop,
				btnVariants,
				contentVariants,
				filterCatData,
				toggleFilter,
				toggleCategory,
				togglePrice,
				handleSelection,
				totalPage,
				range,
			}}
		>
			<div className="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 min-h-screen flex flex-col items-center text-sm pt-5">
				<div className="w-full flex flex-col items-center justify-center py-8 md:py-10 lg:py-12 shadow-xl shadow-blue-600/20 dark:shadow-blue-400/10 text-neutral-800 dark:text-neutral-200 bg-neutral-100/40 dark:bg-neutral-800/40 backdrop-blur-sm ">
					<motion.h1
						className="text-3xl md:text-4xl lg:text-5xl font-extralight italic"
						initial={{ y: -30 }}
						animate={{ y: 0 }}
						transition={{
							delay: 0.4,
							type: "spring",
							bounce: 0.8,
							duration: 0.8,
						}}
					>
						Products
					</motion.h1>
				</div>

				<div className="flex flex-col gap-6 w-screen z-10 backdrop-blur-md bg-neutral-200/60 dark:bg-neutral-800/60">
					<div className="flex items-center justify-evenly md:justify-between gap-4 px-2 lg:px-5">
						<Search />
						<Sort />
					</div>

					<div className="flex flex-col lg:flex-row items-start lg:items-center justify-evenly w-full">
						<div className="relative w-full lg:basis-[20%] self-start">
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
