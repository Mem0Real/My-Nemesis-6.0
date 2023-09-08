"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useThemeContext } from "@/context/ThemeProvider";

const loaderVariants = {
	animationTwo: {
		padding: [0, 15, 0],
		transition: {
			duration: 3,
			ease: "easeInOut",
			repeat: Infinity,
		},
	},
	animationThree: {
		padding: [0, 20, 0],
		transition: {
			duration: 3,
			ease: "easeInOut",
			repeat: Infinity,
		},
	},
	animationFour: {
		padding: [0, 25, 0],
		transition: {
			duration: 3,
			ease: "easeInOut",
			repeat: Infinity,
		},
	},
};

export default function Loading() {
	const [currentTheme, setCurrentTheme] = useState();

	const themeCtx = useThemeContext();

	useEffect(() => {
		const theme = localStorage.getItem("isDarkTheme");
		if (theme === "false") setCurrentTheme("light");
		else setCurrentTheme("dark");
	}, [themeCtx.update]);

	return (
		<div className="bg-neutral-200 dark:bg-neutral-900 h-screen w-screen flex flex-col justify-center items-center">
			<motion.div className="relative h-screen w-screen flex flex-col justify-center items-center">
				<motion.div
					variants={loaderVariants}
					initial={{ padding: 0 }}
					animate="animationTwo"
					className="bg-neutral-800 dark:bg-neutral-800"
				>
					<motion.div
						variants={loaderVariants}
						initial={{ padding: 0 }}
						animate="animationThree"
						className="bg-neutral-600 dark:bg-neutral-900"
					>
						<motion.div
							variants={loaderVariants}
							initial={{ padding: 0 }}
							animate="animationFour"
							className="bg-neutral-400 dark:bg-neutral-950"
						>
							<motion.h1
								animate={{
									borderRadius: ["0%", "0%", "50%", "50%", "0%"],
									rotate: [0, 90, 90, 90, 0],
								}}
								transition={{
									duration: 2,
									ease: "easeInOut",
									times: [0, 0.2, 0.5, 0.8, 1],
									repeat: Infinity,
									repeatDelay: 1,
								}}
								className="w-fit h-fit text-3xl px-4 py-2 bg-black dark:bg-white font-extrabold text-neutral-200 dark:text-neutral-800"
							>
								E
							</motion.h1>
						</motion.div>
					</motion.div>
				</motion.div>
			</motion.div>
		</div>
	);
}
