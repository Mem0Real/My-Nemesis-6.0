"use client";

import { motion, useTransform, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export default function AnimateImage({ children }) {
	const mouseX = useMotionValue(0);

	const handleMouseMove = (event) => {
		mouseX.set(event.clientX);
	};

	const skewX = useTransform(mouseX, [0, window.innerWidth], [-30, 30]);

	return (
		<motion.div
			animate={{ y: 50 }}
			className="border border-neutral-400 border-b-0 rounded-t-2xl drop-shadow-xl"
			onMouseOver={handleMouseMove}
		>
			<motion.div
				className="relative w-56 h-56 mx-auto"
				style={{ transform: `skewX(${skewX?.get()}deg)`, x: `${mouseX}px` }}
			>
				{children}
			</motion.div>
		</motion.div>
	);
}
