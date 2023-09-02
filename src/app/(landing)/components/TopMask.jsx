"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";

export default function TopMask() {
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
		setMaskPositionX(window.innerWidth - maskRect.width - 50);
		setMaskPositionY(maskRect.height / 2);
	}, [maskRef]);

	let scale = useMotionValue(1);
	let scaleText = useMotionValue(1);
	let moveTextX = useMotionValue(0);

	scale = useTransform(scrollYProgress, [0, 1], [1, 20]);
	scaleText = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
	moveTextX = useTransform(scrollYProgress, [0, 1], [0, -150]);

	return (
		<div
			ref={rootRef}
			className="relative z-10 h-[150vh] overflow-clip mt-6 md:-12 lg:mt-24"
		>
			<motion.div
				className={`absolute left-0 top-0 grid gap-2 p-3 pt-6 [grid-template-rows:4fr_1fr] origin-[${maskPositionX}_${maskPositionY}] md:origin-[94%_32%] lg:origin-[${maskPositionX}_${maskPositionY}] `}
				style={{ scale }}
			>
				<div
					ref={scaleRef}
					className={`relative flex flex-col md:flex-row justify-start rounded-3xl bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 px-5 pt-3 md:pb-12`}
				>
					<div className="flex min-h-72 md:h-full flex-col py-2 mt-2 md:py-6 md:mt-6 gap-2 md:gap-6">
						<h1 className="mb-5 max-w-[12ch] font-bold leading-[0.85] md:my-auto text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
							Browse to your heart&apos;s desire!
						</h1>
						<p className="text-lg md:text-xl lg:text-3xl w-full md:w-[60%] me-auto text-start">
							From the wide variety of products our company offers, we can
							guarantee that you will find what you are looking for.
						</p>
					</div>
					<div
						ref={maskRef}
						className="relative mx-auto mb-7 mt-4 box-content aspect-[5/8] w-[100px] min-w-[100px] rounded-full border border-gray-800 dark:border-gray-300 md:my-auto md:-mr-1 md:ml-auto md:w-[150px] md:min-w-[150px] z-20 overflow-hidden"
					>
						<motion.div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center z-10 bg-neutral-100 dark:bg-neutral-900">
							<motion.h1
								className="text-xl md:text-2xl lg:text-4xl w-[150%] bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 -skew-x-12 text-center"
								style={{ scale: scaleText, x: moveTextX }}
							>
								Welcome to Ethio Machineries
							</motion.h1>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
