"use client";

import { useState, useEffect } from "react";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
// import { useTheme } from "next-themes";
import { useThemeContext } from "@/context/ThemeProvider";

export default function CarouselHolder({ children }) {
	const { update } = useThemeContext();

	const [currentTheme, setCurrentTheme] = useState("");

	useEffect(() => {
		const theme = localStorage.getItem("isDarkTheme");
		if (theme === "false") setCurrentTheme("light");
		else setCurrentTheme("dark");
	}, [update]);

	let mouseX = useMotionValue(0);
	let mouseY = useMotionValue(0);

	function handleMouseMove({ currentTarget, clientX, clientY }) {
		let { left, top } = currentTarget.getBoundingClientRect();

		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}

	return (
		<div
			className="group mx-auto w-[95%] relative rounded-xl border border-white/10 bg-gradient-to-r from-white/40 to-white/80 dark:from-black/40 dark:to-neutral-600/80 shadow-inner shadow-black/40 backdrop-blur-sm"
			onMouseMove={handleMouseMove}
		>
			{currentTheme === "dark" ? (
				<motion.div
					className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
					// 		style={{
					// 			background: useMotionTemplate`
					//     radial-gradient(
					//     750px circle at ${mouseX}px ${mouseY}px,
					//     rgba(40, 40, 150, 0.25),
					//     transparent 90%
					//     )
					// `,
					// 		}}

					style={{ skewX: `${mouseX}px`, skewY: `${mouseY}px` }}
				/>
			) : (
				<motion.div
					className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
					// 		style={{
					// 			background: useMotionTemplate`
					//     radial-gradient(
					//     750px circle at ${mouseX}px ${mouseY}px,
					//     rgba(40, 40, 150, 0.25),
					//     transparent 90%
					//     )
					// `,
					// 		}}
					style={{ skewX: `${mouseX}px`, skewY: `${mouseY}px` }}
				/>
			)}
			{children}
		</div>
	);
}
