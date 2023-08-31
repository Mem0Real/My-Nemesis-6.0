"use client";

import { useState, useEffect, createContext, useContext, useRef } from "react";
import dynamic from "next/dynamic";

const SearchModal = dynamic(() => import("./(searchModal)/SearchModal"));
import { motion, AnimatePresence } from "framer-motion";

const SearchContext = createContext({});
export default function SearchBase({ children }) {
	const [searchModal, showSearchModal] = useState(false);

	const searchRef = useRef(null);
	const inputRef = useRef(null);

	// Disable scrollbar on modal open
	useEffect(() => {
		const handleWindowWheel = (event) => {
			if (searchModal && !searchRef?.current.contains(event.target)) {
				event.preventDefault();
			}
		};

		window.addEventListener("wheel", handleWindowWheel, { passive: true });

		return () => {
			window.removeEventListener("wheel", handleWindowWheel);
		};
	}, [searchModal]);

	// Disable lenis scroll on modal open
	useEffect(() => {
		const html = document.querySelector("html");
		searchModal
			? (html.dataset.lenisPrevent = "")
			: delete html.dataset.lenisPrevent;
	}, [searchModal]);

	// Close Search Modal on click outside
	useEffect(() => {
		let handler = (e) => {
			if (searchModal && !searchRef.current.contains(e.target)) {
				closeSearch();
			}
		};

		document.addEventListener("mousedown", handler);

		return () => document.removeEventListener("mousedown", handler);
	}, [searchModal]);

	useEffect(() => {
		const ctrl = (e) => e.ctrlKey && e.key === "k";
		const esc = (e) => e.key === "Escape";

		const handler = (e) => {
			if (ctrl(e)) showSearchModal(true);
			if (esc(e)) showSearchModal(false);
		};

		const ignore = (e) => {
			if (ctrl(e)) e.preventDefault();
		};

		window.addEventListener("keyup", handler);
		window.addEventListener("keydown", ignore);

		return () => {
			window.removeEventListener("keyup", handler);
			window.removeEventListener("keydown", ignore);
		};
	}, []);

	const handleSearch = () => {
		inputRef.current && inputRef.current.focus();
		showSearchModal(true);
	};

	const closeSearch = () => {
		showSearchModal(false);
	};

	const variants = {
		open: {
			opacity: 1,
			display: "flex",
		},
		close: {
			opacity: 0,
			transitionEnd: {
				display: "none",
			},
		},
	};
	return (
		<SearchContext.Provider value={{ handleSearch, closeSearch }}>
			{children}
			<AnimatePresence>
				{/* {searchModal && ( */}
				<motion.div
					key="innerCartM"
					initial={"close"}
					animate={searchModal ? "open" : "close"}
					variants={variants}
					exit={"close"}
					className={`fixed top-0 bottom-0 right-0 left-0 z-40 bg-black/50 backdrop-blur-sm  flex ${
						searchModal ? "pointer-events-auto" : "pointer-events-none"
					}`}
				>
					<SearchModal
						searchModal={searchModal}
						closeSearch={closeSearch}
						searchRef={searchRef}
						inputRef={inputRef}
					/>
				</motion.div>
				{/* )} */}
			</AnimatePresence>
		</SearchContext.Provider>
	);
}

export const useSearchContext = () => useContext(SearchContext);
