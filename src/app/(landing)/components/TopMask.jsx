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

	const mobile = useScroll({
		target: rootRef,
		offset: ["start 50px", "end end"],
	});
	const tablet = useScroll({
		target: rootRef,
		offset: ["start 10px", "end end"],
	});
	const laptop = useScroll({
		target: rootRef,
		offset: ["start start", "end end"],
	});
	const desktop = useScroll({
		target: rootRef,
		offset: ["start 150px", "end end"],
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

	let mobileTextYPos = useMotionValue(0);
	let tabletTextYPos = useMotionValue(0);
	let laptopTextYPos = useMotionValue(0);
	let desktopTextYPos = useMotionValue(0);

	let mobileScale = useMotionValue(1);
	let tabletScale = useMotionValue(1);
	let laptopScale = useMotionValue(1);
	let desktopScale = useMotionValue(1);

	mobileTextYPos = useTransform(mobile.scrollYProgress, [0, 1], [0, -40]);
	tabletTextYPos = useTransform(tablet.scrollYProgress, [0, 1], [0, -20]);
	laptopTextYPos = useTransform(laptop.scrollYProgress, [0, 1], [0, 40]);
	desktopTextYPos = useTransform(desktop.scrollYProgress, [0, 1], [0, 60]);

	// scale = useTransform(normal.scrollYProgress, [0, 1], ["100%", "3000%"]);
	scaleText = useTransform(laptop.scrollYProgress, [0, 1], [1, 0.2]);
	moveTextX = useTransform(laptop.scrollYProgress, [0, 1], [150, -150]);

	mobileScale = useTransform(mobile.scrollYProgress, [0, 1], ["100%", "1500%"]);
	tabletScale = useTransform(tablet.scrollYProgress, [0, 1], ["100%", "2000%"]);
	laptopScale = useTransform(laptop.scrollYProgress, [0, 1], ["100%", "5000%"]);
	desktopScale = useTransform(
		desktop.scrollYProgress,
		[0, 1],
		["100%", "5000%"]
	);

	if (width <= 768) {
		moveTextY = mobileTextYPos;
	} else if (width <= 1024) {
		moveTextY = tabletTextYPos;
	} else if (width <= 1400) {
		moveTextY = laptopTextYPos;
	} else {
		moveTextY = desktopTextYPos;
	}

	if (width <= 768) {
		scale = mobileScale;
	} else if (width <= 1024) {
		scale = tabletScale;
	} else if (width <= 1440) {
		scale = laptopScale;
	} else {
		scale = desktopScale;
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

	const mobileOriginX = origin.x;
	const tabletOriginX = origin.x + 40;
	const laptopOriginX = origin.x + 50;
	const desktopOriginX = origin.x + 100;

	const mobileOriginY = origin.y;
	const tabletOriginY = origin.y + 80;
	const laptopOriginY = origin.y + 20;
	const desktopOriginY = origin.y + 50;

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
					transformOrigin: `${
						width <= 768
							? mobileOriginX
							: width <= 1024
							? tabletOriginX
							: width <= 1440
							? laptopOriginX
							: desktopOriginX
					}px ${
						width <= 768
							? mobileOriginY
							: width <= 1024
							? tabletOriginY
							: width <= 1440
							? laptopOriginY
							: desktopOriginY
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
