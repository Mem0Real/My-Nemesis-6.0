"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function TextAnimation({ sentence, className }) {
	const ref = useRef(null);

	const isInView = useInView(ref);

	const words = sentence.split(" ");

	const container = {
		hidden: { x: -20, opacity: 0 },
		visible: (i = 1) => ({
			x: 0,
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.05 * i,
			},
		}),
	};

	const children = {
		hidden: {
			x: -20,
			opacity: 0,
		},

		visible: (i = 1) => ({
			x: 0,
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
				delayChildren: 0.05 * i,
			},
		}),
	};

	const nest = {
		hidden: { opacity: 0, rotateY: -180 },
		visible: { opacity: 1, rotateY: 0 },
	};

	const underline = {
		hidden: { scaleX: "0%", x: 0 },
		visible: {
			scaleX: "100%",
			x: 0,
			transition: {
				duration: 0.7,
				ease: "easeInOut",
			},
		},
	};

	return (
		<div className="bg-neutral-100 dark:bg-neutral-900 flex flex-col gap-4 w-fit mx-auto">
			<motion.div
				ref={ref}
				className="relative flex items-center justify-center gap-6"
				initial="hidden"
				exit="hidden"
				whileInView="visible"
				variants={container}
				viewport={{ once: true }}
			>
				{words.map((word, index) => (
					<motion.div
						key={index}
						className="flex items-center justify-center gap-0 w-full md:w-fit text-neutral-800 dark:text-neutral-200 pb-2"
						variants={children}
					>
						{word.split("").map((letter, nestIndex) => (
							<motion.p key={nestIndex} variants={nest} className="text-7xl">
								{letter}
							</motion.p>
						))}
					</motion.div>
				))}
				<motion.div
					className="h-1 absolute bottom-0 left-0 right-0 z-10 justify-start origin-[0%_0%] bg-neutral-900 dark:bg-neutral-100"
					initial="hidden"
					exit="hidden"
					animate={isInView && "visible"}
					variants={underline}
				/>
			</motion.div>
		</div>
	);
}
