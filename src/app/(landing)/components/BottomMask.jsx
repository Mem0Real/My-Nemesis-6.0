"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";

export default function BottomMask() {
	const [dimension, setDimension] = useState({ width: 0, height: 0 });
	const [origin, setOrigin] = useState({ x: 0, y: 0 });
	const [updatedOrigin, setUpdatedOrigin] = useState({ x: 0, y: 0 });

	const [resized, setResized] = useState(false);

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
		const resize = (res = true) => {
			console.log("Resized");
			setDimension({ width: window.innerWidth, height: window.innerHeight });

			const containerWidth = containerRef.current.offsetWidth;
			const bodyWidth = bodyRef.current.getBoundingClientRect().width;

			const maskWidth = maskRef.current?.getBoundingClientRect().width / 2;
			const maskRight = maskRef.current.getBoundingClientRect().right;

			const maskDiff = bodyWidth - maskRight;
			let centerX = containerWidth - maskDiff - maskWidth;

			const containerHeight =
				containerRef.current?.getBoundingClientRect().height;
			const maskHeight = maskRef.current?.getBoundingClientRect().height;
			let centerY = containerHeight - maskHeight;

			console.info(centerX, centerY);
			centerX = Math.round(centerX);
			centerY = Math.round(centerY);
			setOrigin({ x: centerX, y: centerY });

			if (res === true) {
				setUpdatedOrigin({ x: centerX, y: centerY });
				setResized(true);
			}
		};

		window.addEventListener("resize", resize);
		resize(false);

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

	mobileTextYPos = useTransform(mobile.scrollYProgress, [0, 1], [0, -10]);
	tabletTextYPos = useTransform(tablet.scrollYProgress, [0, 1], [0, 30]);
	laptopTextYPos = useTransform(laptop.scrollYProgress, [0, 1], [0, 40]);
	desktopTextYPos = useTransform(desktop.scrollYProgress, [0, 1], [0, 60]);

	scaleText = useTransform(laptop.scrollYProgress, [0, 1], [0.8, 0.6]);
	moveTextX = useTransform(laptop.scrollYProgress, [0, 1], [250, -200]);

	mobileScale = useTransform(mobile.scrollYProgress, [0, 1], [15, 1]);
	tabletScale = useTransform(tablet.scrollYProgress, [0, 1], [20, 1]);
	laptopScale = useTransform(laptop.scrollYProgress, [0, 1], [25, 1]);
	desktopScale = useTransform(desktop.scrollYProgress, [0, 1], [30, 1]);

	if (resized) {
		if (origin.x === updatedOrigin.x && origin.y === updatedOrigin.y) {
			if (origin.x !== 0 && origin.y !== 0 && width <= 768) {
				scale = mobileScale;
				moveTextY = mobileTextYPos;
			} else if (origin.x !== 0 && origin.y !== 0 && width <= 1024) {
				scale = tabletScale;
				moveTextY = tabletTextYPos;
			} else if (origin.x !== 0 && origin.y !== 0 && width <= 1400) {
				scale = laptopScale;
				moveTextY = laptopTextYPos;
			} else if (origin.x !== 0 && origin.y !== 0 && width > 1400) {
				scale = desktopScale;
				moveTextY = desktopTextYPos;
			}
			setResized(false);
		}
	} else {
		if (origin.x !== 0 && origin.y !== 0 && width <= 768) {
			scale = mobileScale;
			moveTextY = mobileTextYPos;
		} else if (origin.x !== 0 && origin.y !== 0 && width <= 1024) {
			scale = tabletScale;
			moveTextY = tabletTextYPos;
		} else if (origin.x !== 0 && origin.y !== 0 && width <= 1400) {
			scale = laptopScale;
			moveTextY = laptopTextYPos;
		} else if (origin.x !== 0 && origin.y !== 0 && width > 1400) {
			scale = desktopScale;
			moveTextY = desktopTextYPos;
		}
	}

	const mobileOriginX = origin.x;
	const tabletOriginX = origin.x + 40;
	const laptopOriginX = origin.x + 50;
	const desktopOriginX = origin.x + 100;

	const mobileOriginY = origin.y;
	const tabletOriginY = origin.y + 80;
	const laptopOriginY = origin.y + 60;
	const desktopOriginY = origin.y + 80;

	return (
		<div
			ref={rootRef}
			className="relative z-10 min-h-[150vh] max-h-[200vh] overflow-clip pt-[100vh]"
		>
			<motion.div
				className="w-5 h-5 rounded-md bg-orange-800 absolute z-50"
				style={{ x: laptopOriginX, y: laptopOriginY }}
			/>
			<motion.div
				ref={bodyRef}
				className={`flex flex-col justify-end items-center gap-2`}
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
					className={`relative flex flex-col w-full md:flex-row justify-start rounded-3xl bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 px-5`}
				>
					<div
						ref={scaleRef}
						className="flex min-h-72 md:h-full flex-col py-2 mt-2 md:pb-12 md:mt-6 gap-2 md:gap-6"
					>
						<h1 className="mb-5 max-w-[12ch] font-bold leading-[0.85] md:my-auto text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
							For all your purchase needs!
						</h1>
						<p className="text-lg md:text-xl lg:text-3xl w-full md:w-[60%] me-auto text-start">
							We are here to provide you with state of the art technologies with
							the utmost quality.
						</p>
					</div>
					<div
						ref={maskRef}
						className="relative mx-auto my-12 box-content aspect-[5/8] w-[100px] min-w-[100px] rounded-full border border-gray-800 dark:border-gray-300 md:my-auto md:-mr-1 md:ml-auto md:w-[150px] md:min-w-[150px] z-20 overflow-hidden"
					>
						<motion.div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center z-10 bg-neutral-100 dark:bg-neutral-900">
							<motion.h1
								className="text-xl md:text-2xl lg:text-4xl w-[200%] bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 -skew-x-12 text-center"
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
