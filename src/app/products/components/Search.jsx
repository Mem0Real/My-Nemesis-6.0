"use client";

import { useState, useEffect, useRef } from "react";

import useCustomRouter from "@/hooks/useCustomRouter";

import { useIcons } from "@/app/utils/CustomIcons";
import { motion } from "framer-motion";

export default function SearchForm({ searchRef, searchInputRef }) {
	const [text, setText] = useState({ search: "" });

	// const inputRef = useRef();

	const { pushQuery, query } = useCustomRouter();

	const { SearchIcon, CloseIcon } = useIcons();

	const handleSubmit = (e) => {
		e.preventDefault();
		searchInputRef.current.blur();
		handleSearch(text);
	};

	const handleChange = (e, clear = null) => {
		if (e.target.value) {
			setText(() => ({ search: e.target.value }));
		} else {
			setText(() => ({ search: "" }));
			query.search = "";
		}

		if (clear) {
			setText(() => ({ search: "" }));
			query.search = "";
			pushQuery(query);
		}
	};
	const handleSearch = (query) => {
		pushQuery(query);
	};

	useEffect(() => {
		handleSearch(text);
	}, [text, handleSearch]);

	return (
		<form
			ref={searchRef}
			className="flex justify-between relative border border-neutral-600 dark:border-neutral-400 rounded-md text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800"
			onSubmit={handleSubmit}
		>
			<motion.button
				className="absolute left-1 top-0 bottom-0 grid place-content-center cursor-pointer text-neutral-800 dark:text-neutral-200"
				whileHover={{ scale: 1.05 }}
				type="submit"
			>
				{SearchIcon}
			</motion.button>
			<input
				ref={searchInputRef}
				type="text"
				name="search"
				placeholder="Search"
				className="ps-7 pe-2 w-36 lg:w-44 py-2 rounded-md text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800"
				value={text?.search || query?.search || ""}
				onChange={handleChange}
			/>
			<motion.button
				className="absolute right-2 top-1.5 grid place-content-center z-10 text-neutral-600 dark:text-neutral-400 cursor-pointer"
				onClick={(e) => handleChange(e, "clear")}
			>
				{CloseIcon}
			</motion.button>
		</form>
	);
}
