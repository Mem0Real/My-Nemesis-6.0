"use client";

import { useEffect, useRef } from "react";
import {
	motion,
	useMotionValueEvent,
	useScroll,
	useTransform,
} from "framer-motion";

export default function Title() {
	let sentence = "Best Sellers";
	const letters = sentence.split("");

	const container = {
		hidden: { opacity: 0 },
		visible: (i = 1) => ({
			opacity: 1,
			transition: {
				staggerChildren: 0.02,
				delayChildren: 0.05 * i,
			},
		}),
	};

	const children = {
		hidden: {
			opacity: 0,
			y: 0,
		},

		visible: {
			opacity: 1,
			rotate: 90,
			y: 50,
		},
	};

	return (
		<motion.div className="w-screen flex flex-col justify-center items-center py-12">
			<motion.div
				id="container"
				className={` text-neutral-900 dark:text-neutral-100`}
				variants={container}
				initial="hidden"
				whileInView={"visible"}
			>
				{letters.map((letter, index) => (
					<motion.span
						key={index}
						className="italic text-5xl font-semibold"
						variants={children}
					>
						{letter}
					</motion.span>
				))}
			</motion.div>
		</motion.div>
	);
}
