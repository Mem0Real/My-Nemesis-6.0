"use client";

import styles from "../styles/mask.module.scss";
import React, { useState, useEffect, useRef } from "react";

import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";

export default function BottomMask() {
	const [maskPositionX, setMaskPositionX] = useState(0);
	const [maskPositionY, setMaskPositionY] = useState(0);

	const [isMobile, setIsMobile] = useState(false);

	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	});

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (windowSize.width && windowSize.width <= 768) {
			setIsMobile(true);
		} else setIsMobile(false);
	}, [windowSize]);

	const rootRef = useRef();
	const maskRef = useRef();
	const scaleRef = useRef();

	const smScroll = useScroll({
		target: rootRef,
		offset: ["start end", "end end"],
	});

	const nmScroll = useScroll({
		target: rootRef,
		offset: ["start end", "end end"],
	});
	const { scrollYProgress } = isMobile ? smScroll : nmScroll;

	useEffect(() => {
		const maskRect = maskRef.current.getBoundingClientRect();
		const bodyX = window.innerWidth - maskRect.width;
		const bodyY = window.innerHeight - maskRect.height;

		setMaskPositionX(window.innerWidth - bodyX - 50);
		setMaskPositionY(bodyY + 190);
	}, [maskRef]);

	let scale = useMotionValue(20);
	let y = useMotionValue(0);
	let scaleText = useMotionValue(0.1);
	let moveTextX = useMotionValue(0);
	let moveTextY = useMotionValue(0);

	scale = useTransform(scrollYProgress, [0, 1], [20, 1]);
	const mtSm = useTransform(scrollYProgress, [0.5, 1], [10, 20]);
	const mtNm = useTransform(scrollYProgress, [0.5, 1], [30, 50]);

	const mSm = undefined;
	const mNm = useTransform(scrollYProgress, [0.7, 1], [100, 150]);

	scaleText = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
	moveTextX = useTransform(scrollYProgress, [0, 1], [300, -170]);

	moveTextY = isMobile ? mtSm : mtNm;

	return (
		<main className="mx-auto bg-neutral-100 dark:bg-neutral-800 backdrop-blur-lg">
			<div ref={rootRef} className="relative z-10 h-[180vh] overflow-clip">
				<motion.div
					style={{ scale }}
					className={`absolute right-0 bottom-0 grid w-screen min-h-screen gap-2 p-3 pt-20 md:pt-0 [grid-template-rows:4fr_1fr] origin-[50%_30%] md:origin-[16%_48%] lg:origin-[8%_48%] xl:origin-[8%_36%]`}
				>
					<div
						ref={scaleRef}
						className={`relative flex flex-col md:flex-row justify-end rounded-3xl bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 p-12`}
					>
						<div
							ref={maskRef}
							className="relative mx-auto mt-24 md:mt-0 mb-12 box-content aspect-[5/8] w-[100px] min-w-[100px] rounded-full border-[2px] border-gray-800 dark:border-gray-300 md:my-auto md:-ml-1 md:mr-auto md:w-[150px] md:min-w-[150px] overflow-hidden"
						>
							<motion.div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center z-10 bg-neutral-100 dark:bg-neutral-900">
								<motion.h1
									className="text-xl md:text-2xl lg:text-4xl w-[250%] bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 -skew-x-12 text-center"
									style={{ scale: scaleText, x: moveTextX, y: moveTextY }}
								>
									Wait, there&apos;s more.
								</motion.h1>
							</motion.div>
						</div>
						<div className="flex min-h-72 md:h-full flex-col py-12 -mt-12 gap-12 items-end text-right">
							<h1 className="mb-5 max-w-[12ch] text-4xl font-bold leading-[0.85] md:my-auto md:text-6xl xl:text-7xl">
								For all your purchase needs!
							</h1>
							<p className="text-lg md:text-3xl">We are always here for you.</p>
						</div>
					</div>
				</motion.div>
			</div>
		</main>
	);
}
