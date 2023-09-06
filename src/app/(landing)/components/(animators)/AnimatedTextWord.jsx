"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AnimatedTextWord({ word, className }) {
	const [text, showText] = useState(false);

	const containerRef = useRef();

	const letters = word.split("");

	const { scrollYProgress } = useScroll({
		ref: containerRef,
		offset: ["start end"],
	});
	const viewPort = useTransform(scrollYProgress, [0, 1], [false, true]);

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
			y: 50,
		},
	};
	return (
		<motion.div
			id="container"
			ref={containerRef}
			className={`${className} text-neutral-900 dark:text-neutral-100`}
			variants={container}
			initial="hidden"
			whileInView="visible"
		>
			{/* {letters.map((letter, index) => (
				<motion.span id={index} key={index} variants={children}>
					{letter}
				</motion.span>
			))} */}
			<motion.h1>{letters}</motion.h1>
		</motion.div>

		// <motion.div
		// 	initial={{ opacity: 0, rotateY: 0 }}
		// 	animate={{ opacity: 1, rotateY: -180 }}
		// 	exit={{ opacity: 0, rotateY: 0 }}
		// 	transition={{
		// 		duration: 3,
		// 		repeat: Infinity,
		// 		ease: "easeInOut",
		// 	}}
		// 	className="text-4xl"
		// >
		// 	E
		// </motion.div>
	);
}
