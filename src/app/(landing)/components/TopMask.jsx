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
		offset: ["start start", "end end"],
	});
	const normal = useScroll({
		target: rootRef,
		offset: ["20px start", "end end"],
	});

	useEffect(() => {
		const resize = () => {
			setDimension({ width: window.innerWidth, height: window.innerHeight });

			const maskWidth = maskRef.current?.getBoundingClientRect().width / 2;
			const maskPos = maskRef.current?.getBoundingClientRect().x;
			let centerX = maskPos + maskWidth;

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

	let smScale = useMotionValue(1);
	let nmScale = useMotionValue(1);
	let lgScale = useMotionValue(1);

	smTextYPos = useTransform(small.scrollYProgress, [0, 1], [0, -50]);
	textYPos = useTransform(normal.scrollYProgress, [0, 1], [0, 0]);

	// scale = useTransform(normal.scrollYProgress, [0, 1], ["100%", "3000%"]);
	scaleText = useTransform(normal.scrollYProgress, [0, 1], [1, 0.2]);
	moveTextX = useTransform(normal.scrollYProgress, [0, 1], [150, -150]);

	smScale = useTransform(small.scrollYProgress, [0, 1], ["100%", "1000%"]);
	nmScale = useTransform(normal.scrollYProgress, [0, 1], ["100%", "1000%"]);
	lgScale = useTransform(normal.scrollYProgress, [0, 1], ["100%", "5000%"]);

	if (width < 768) {
		moveTextY = smTextYPos;
		console.info("Is Mobile");
	} else {
		moveTextY = textYPos;
		console.info("Not mobile");
	}

	if (width <= 1024) {
		scale = smScale;
	} else if (width <= 1440) {
		scale = nmScale;
		console.info("Normal");
	} else {
		scale = lgScale;
		console.info("GIANT");
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
				ref={bodyRef}
				className={`flex flex-col justify-center items-center gap-2`}
				style={{
					scale,
					transformOrigin: `${origin.x}px ${origin.y}px`,
				}}
			>
				<div
					ref={containerRef}
					className={`w-[90%] mx-auto relative flex flex-col md:flex-row justify-between items-start rounded-3xl bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 px-3 md:px-6 lg:px-9 xl:px-12 py-2 md:py-6`}
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
					<div className="relative mx-auto my-12 box-content aspect-[5/8] w-[100px] min-w-[100px] rounded-full border border-gray-800 dark:border-gray-300 md:my-auto md:-mr-1 md:ml-auto md:w-[150px] md:min-w-[150px] z-20 overflow-hidden">
						<motion.div
							ref={maskRef}
							className="absolute inset-0 w-full h-full flex flex-col justify-center items-center z-10 bg-neutral-100 dark:bg-neutral-900"
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
