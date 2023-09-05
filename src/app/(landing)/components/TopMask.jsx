"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";

export default function TopMask() {
	const [dimension, setDimension] = useState({ width: 0, height: 0 });
	const [origin, setOrigin] = useState({ x: 0, y: 0 });

	const rootRef = useRef();
	const bodyRef = useRef();
	const maskRef = useRef();
	const scaleRef = useRef();
	const containerRef = useRef();

	const small = useScroll({
		target: rootRef,
		offset: ["start 50px", "end end"],
	});
	const normal = useScroll({
		target: rootRef,
		offset: ["start start", "end end"],
	});

	useEffect(() => {
		const resize = () => {
			setDimension({ width: window.innerWidth, height: window.innerHeight });

			const windowWidth = window.innerWidth;
			const bodyWidth = bodyRef.current.getBoundingClientRect().width;
			const containerWidth = containerRef.current.offsetWidth;

			const scaleWidth = scaleRef.current.offsetWidth;
			const mask = maskRef.current.getBoundingClientRect();

			const bodyDiff = windowWidth - containerWidth;
			const bodyDiffStart = bodyDiff / 2;

			const containerEnd = bodyDiffStart + containerWidth;

			const maskWidth = maskRef.current?.getBoundingClientRect().width / 2;
			const maskPos = maskRef.current?.getBoundingClientRect().x;
			// let centerX = maskPos + maskWidth;

			console.info("BW:", bodyWidth);
			console.info("SW:", scaleWidth);
			console.info("CW:", containerWidth);
			console.info("MAsk", bodyWidth - mask.right);

			const maskDiff = bodyWidth - mask.right;

			let centerX = containerWidth - maskDiff - maskWidth;
			const containerHeight =
				containerRef.current?.getBoundingClientRect().height;
			const maskHeight = maskRef.current?.getBoundingClientRect().height;
			let centerY = containerHeight - maskHeight;

			centerX = Math.round(centerX);
			centerY = Math.round(centerY);
			setOrigin({ x: centerX, y: centerY });
		};

		window.addEventListener("resize", resize);
		resize();

		return () => {
			window.removeEventListener("resize", resize);
		};
	}, []);

	const { width, height } = dimension;

	let scale = useMotionValue(1);
	let scaleText = useMotionValue(1);
	let moveTextX = useMotionValue(0);
	let moveTextY = useMotionValue(0);

	let smTextYPos = useMotionValue(0);
	let textYPos = useMotionValue(0);
	let lgTextYPos = useMotionValue(0);

	let smScale = useMotionValue(1);
	let nmScale = useMotionValue(1);
	let lgScale = useMotionValue(1);

	smTextYPos = useTransform(small.scrollYProgress, [0, 1], [0, -50]);
	textYPos = useTransform(normal.scrollYProgress, [0, 1], [0, 20]);
	lgTextYPos = useTransform(normal.scrollYProgress, [0, 1], [0, 40]);

	// scale = useTransform(normal.scrollYProgress, [0, 1], ["100%", "3000%"]);
	scaleText = useTransform(normal.scrollYProgress, [0, 1], [1, 0.2]);
	moveTextX = useTransform(normal.scrollYProgress, [0, 1], [150, -150]);

	smScale = useTransform(small.scrollYProgress, [0, 1], ["100%", "1500%"]);
	nmScale = useTransform(normal.scrollYProgress, [0, 1], ["100%", "2000%"]);
	lgScale = useTransform(normal.scrollYProgress, [0, 1], ["100%", "5000%"]);

	if (width <= 768) {
		moveTextY = smTextYPos;
	} else if (width <= 1400) {
		moveTextY = textYPos;
	} else {
		moveTextY = lgTextYPos;
	}

	if (width <= 1024) {
		scale = smScale;
	} else if (width <= 1440) {
		scale = nmScale;
	} else {
		scale = lgScale;
	}

	// Set Width
	useEffect(() => {
		// const windowWidth = window?.innerWidth;
		// const containerWidth = containerRef.current?.getBoundingClientRect().width;
		// const scaleBodyWidth = scaleRef.current?.getBoundingClientRect().width;
		// const maskWidth = maskRef.current?.getBoundingClientRect().width / 2;
		// const maskPos = maskRef.current?.getBoundingClientRect().x;
		// const centerX = maskPos + maskWidth;
		// setOriginX(parseInt(centerX));
		// const emptySpaceWindow = windowWidth - containerWidth;
		// const emptySpaceBody = containerWidth - scaleBodyWidth;
		// const maskDistanceX =
		// 	emptySpaceWindow / 2 + containerWidth - emptySpaceBody / 2;
	}, []);

	// Set Height
	useLayoutEffect(() => {
		// const rootHeight = rootRef.current?.getBoundingClientRect().height;
		// const containerHeight =
		// 	containerRef.current?.getBoundingClientRect().height;
		// const scaleBodyHeight = scaleRef.current?.getBoundingClientRect().height;
		// const maskHeight = maskRef.current?.getBoundingClientRect().height;
		// const emptyWindow = rootHeight - containerHeight;
		// const emptyContainer = containerHeight - maskHeight;
		// const tew = emptyWindow / 2;
		// const tec = emptyContainer / 2;
		// const maskCenterY = maskHeight / 2;
		// let emptyBody = scaleBodyHeight - maskHeight;
		// emptyBody = emptyBody / 2;
		// // const maskDistanceY = emptyContainer + emptyBody + maskCenterY;
		// const maskDistanceY = tew + tec + maskCenterY;
		// setOriginY(emptyContainer);
	}, []);

	return (
		<div ref={rootRef} className="relative z-10 h-[150vh] overflow-clip">
			<motion.div
				className="w-5 h-5 rounded-full bg-blue-500 absolute z-50"
				style={{ x: width <= 768 ? origin.x : origin.x + 50, y: origin.y }}
			/>
			<motion.div
				ref={bodyRef}
				className={`flex flex-col justify-center items-center gap-2`}
				style={{
					scale,
					transformOrigin: `${width <= 768 ? origin.x : origin.x + 50}px ${
						origin.y
					}px`,
				}}
			>
				<div
					ref={containerRef}
					className={`relative flex flex-col md:flex-row justify-between items-start rounded-3xl bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 px-3 md:px-6 lg:px-9 xl:px-12 py-2 md:py-6`}
				>
					<div
						ref={scaleRef}
						className="flex flex-col py-4 md:py-8 gap-5 md:gap-8"
					>
						<h1 className="mb-5 max-w-[12ch] font-bold leading-[0.85] md:my-auto text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
							Browse to your heart&apos;s desire!
						</h1>
						<p className="text-lg md:text-xl lg:text-3xl w-full md:w-[60%] me-auto text-start">
							From the wide variety of products our company offers, we can
							guarantee that you will find what you are looking for.
						</p>
					</div>
					<div className="relative mx-auto my-12 box-content aspect-[5/8] w-[100px] rounded-full border border-gray-800 dark:border-gray-300 md:my-auto md:-mr-1 md:ml-auto md:w-[150px] md:min-w-[150px] z-20 overflow-hidden">
						<motion.div
							ref={maskRef}
							className="w-full h-full flex flex-col justify-center items-center z-10 bg-neutral-100 dark:bg-neutral-900"
						>
							<motion.h1
								className="text-xl md:text-2xl lg:text-4xl w-[150%] bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 -skew-x-12 text-center tracking-widest"
								style={{ scale: scaleText, x: moveTextX, y: moveTextY }}
							>
								Welcome
							</motion.h1>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
