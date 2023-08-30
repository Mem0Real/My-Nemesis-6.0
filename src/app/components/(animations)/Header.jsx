"use client";

import { motion } from "framer-motion";

export default function Header({ title, className }) {
	return (
		<motion.h1
			className={`text-3xl md:text-4xl lg:text-5xl font-extralight italic ${className}`}
			initial={{ y: -30 }}
			animate={{ y: 0 }}
			transition={{
				type: "spring",
				bounce: 0.8,
				duration: 1.2,
			}}
		>
			{title}
		</motion.h1>
	);
}
