"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Titles({ name, className }) {
	return (
		<motion.h1
			initial={{ y: 30, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{
				delay: 0.2,
				duration: 0.5,
				ease: "easeIn",
			}}
			className={className}
		>
			{name}
		</motion.h1>
	);
}
