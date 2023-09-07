"use client";

import * as React from "react";

import { useState, useEffect } from "react";
import { useThemeContext } from "@/context/ThemeProvider";

import { motion } from "framer-motion";

const Path = (props) => {
	const [currentTheme, setCurrentTheme] = useState();

	const themeCtx = useThemeContext();

	useEffect(() => {
		const theme = localStorage.getItem("isDarkTheme");
		if (theme === "false") setCurrentTheme("light");
		else setCurrentTheme("dark");
	}, [themeCtx.update]);

	return (
		<motion.path
			fill="transparent"
			strokeWidth="3"
			// stroke="hsl(0, 0%, 18%)"
			stroke={`${currentTheme === "light" ? "#000" : "#fff"}`}
			strokeLinecap="round"
			{...props}
		/>
	);
};

export const MenuToggle = ({ toggle }) => {
	return (
		<button
			onClick={toggle}
			className="outline-none border-none cursor-pointer absolute top-[17px] left-[19px] w-[30px] h-[30px] rounded-full"
			style={{
				userSelect: "none",
				msUserSelect: "none",
				MozUserSelect: "none",
			}}
		>
			<svg width="23" height="23" viewBox="0 0 23 23">
				<Path
					variants={{
						closed: { d: "M 2 2.5 L 20 2.5" },
						open: { d: "M 3 16.5 L 17 2.5" },
					}}
				/>
				<Path
					d="M 2 9.423 L 20 9.423"
					variants={{
						closed: { opacity: 1 },
						open: { opacity: 0 },
					}}
					transition={{ duration: 0.1 }}
				/>
				<Path
					variants={{
						closed: { d: "M 2 16.346 L 20 16.346" },
						open: { d: "M 3 2.5 L 17 16.346" },
					}}
				/>
			</svg>
		</button>
	);
};
