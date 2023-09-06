"use client";

import React, { useEffect, useRef, useState } from "react";
import {
	AnimatePresence,
	motion,
	useScroll,
	useTransform,
	useWillChange,
} from "framer-motion";

export default function AnimatedTextWord({ word, className }) {
	const [text, setText] = useState(0);

	const willChange = useWillChange();

	const containerRef = useRef();

	const letters = word.split("");

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: [`start end`, "end center"],
	});

	const len = letters.length;
	const letter = useTransform(scrollYProgress, [0, 1], [0, len]);

	useEffect(() => {
		const showLetter = letter.on("change", (value) => {
			console.log(Math.round(value));
			setText(Math.round(value));
		});

		return () => showLetter();
	}, [letter]);

	// console.log(letters.length);
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
		},

		visible: {
			opacity: 1,
			rotate: 90,
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
			{/* {letters.map(
				(letter, index) =>
					index < text && (
						<AnimatePresence key={index}>
							<motion.span
								layout
								id={index}
								itemID={index + "item"}
								key={index}
								variants={children}
								initial="hidden"
								animate={index < text ? "visible" : "hidden"}
								exit="hidden"
								transition={{
									duration: 0.4,
									ease: "easeInOut",
								}}
							>
								{letter}
							</motion.span>
						</AnimatePresence>
					)
			)} */}

			{letters.map((letter, index) => (
				<motion.span key={index} className="italic px-0.5" variants={children}>
					{letter}
				</motion.span>
			))}
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
