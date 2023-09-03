"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";

export default function BottomMask() {
	const [maskPositionX, setMaskPositionX] = useState(0);
	const [maskPositionY, setMaskPositionY] = useState(0);

	const rootRef = useRef();
	const maskRef = useRef();
	const scaleRef = useRef();

	const { scrollYProgress } = useScroll({
		target: rootRef,
		offset: ["start start", "end end"],
	});

	useEffect(() => {
		const maskRect = maskRef.current.getBoundingClientRect();
		const bodyWidth = window.innerWidth - maskRect.width;
		setMaskPositionX(bodyWidth + maskRect.width / 2);
		setMaskPositionY(maskRect.height / 2);
	}, [maskRef]);

	let scale = useMotionValue(1);
	let y = useMotionValue(0);
	let scaleText = useMotionValue(1);
	let moveTextX = useMotionValue(0);
	let moveTextY = useMotionValue(0);

	scale = useTransform(scrollYProgress, [0, 1], [20, 1]);
	y = useTransform(scrollYProgress, [0, 1], ["10vh", "80vh"]);
	scaleText = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
	moveTextX = useTransform(scrollYProgress, [0, 1], [150, -150]);
	moveTextY = useTransform(scrollYProgress, [0, 1], [0, -20]);

	return (
		<div ref={rootRef} className="relative z-10 h-[150vh] overflow-clip mb-3">
			<motion.div
				className={`absolute left-0 right-0 top-0 grid w-screen gap-2 p-3 [grid-template-rows:4fr_1fr] justify-content-center  origin-[${maskPositionX}_${maskPositionY}] md:origin-[94%_32%] lg:origin-[${maskPositionX}_${maskPositionY}] `}
				style={{ scale, y }}
			>
				<div
					ref={scaleRef}
					className={`relative flex flex-col md:flex-row justify-start rounded-3xl bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 px-5 pt-3 md:pb-12`}
				>
					<div className="flex min-h-72 md:h-full flex-col py-2 mt-2 md:py-6 md:mt-6 gap-2 md:gap-6">
						<h1 className="mb-5 max-w-[12ch] font-bold leading-[0.85] md:my-auto text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
							For all your purchase needs!
						</h1>
						<p className="text-lg md:text-xl lg:text-3xl w-full md:w-[60%] me-auto text-start">
							We are always here for you.
						</p>
					</div>
					<div
						ref={maskRef}
						className="relative mx-auto my-12 box-content aspect-[5/8] w-[100px] min-w-[100px] rounded-full border border-gray-800 dark:border-gray-300 md:my-auto md:-mr-1 md:ml-auto md:w-[150px] md:min-w-[150px] z-20 overflow-hidden"
					>
						<motion.div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center z-10 bg-neutral-100 dark:bg-neutral-900">
							<motion.h1
								className="text-xl md:text-2xl lg:text-4xl w-[180%] bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 -skew-x-12 text-center"
								style={{ scale: scaleText, x: moveTextX, y: moveTextY }}
							>
								Come Back Soon!
							</motion.h1>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
