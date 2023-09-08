"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import { useThemeContext } from "@/context/ThemeProvider";

export default function Background() {
	const { update } = useThemeContext();

	const [currentTheme, setCurrentTheme] = useState("");

	useEffect(() => {
		const theme = localStorage.getItem("isDarkTheme");
		if (theme === "false") setCurrentTheme("light");
		else setCurrentTheme("dark");
	}, [update]);

	return (
		<div className="fixed h-screen w-screen z-0 bg-neutral-100/60 dark:bg-neutral-800/60">
			{currentTheme === "light" ? (
				<Image
					src="/images/Day.webp"
					fill
					sizes="(max-width: 768px) 100vw"
					alt="catalogue"
					className="object-cover object-center"
				/>
			) : (
				<Image
					src="/images/Night.webp"
					fill
					sizes="(max-width: 768px) 100vw"
					alt="catalogue"
					className="object-cover object-center"
				/>
			)}
		</div>
	);
}
