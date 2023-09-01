"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import styles from "../styles/mask.module.scss";
import Image from "next/image";

export default function TopMask() {
	const [isMobile, setIsMobile] = useState(false);

	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	});

	const ref = useRef(null);

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

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end end"],
	});

	const maskScaleTransform = useTransform(scrollYProgress, [0, 1], [1, 20]);

	const imageScaleTransform = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
	const imgXTransform = useTransform(scrollYProgress, [0, 1], [50, 25]);
	const imgYTransform = useTransform(scrollYProgress, [0, 1], [0, -20]);

	const smImageScaleTransform = useTransform(scrollYProgress, [0, 1], [1, 0.1]);
	const smImgXTransform = useTransform(
		scrollYProgress,
		[0, 0.5, 1],
		[10, -5, 0]
	);
	const smImgYTransform = useTransform(scrollYProgress, [0, 1], [0, 20]);

	const scale = maskScaleTransform;
	const x = isMobile ? smImgXTransform : imgXTransform;
	const y = isMobile ? smImgYTransform : imgYTransform;
	const imgScale = isMobile ? smImageScaleTransform : imageScaleTransform;

	return (
		<div ref={ref} className="relative z-10 h-[150vh] overflow-clip">
			<motion.div
				style={{ scale }}
				className={`${styles.heroBackground} absolute left-0 top-0 grid gap-2 p-3 pt-6 [grid-template-rows:4fr_1fr] origin-[50%_62%] md:origin-[94%_32%] lg:origin-[96%_32%] mt-24`}
			>
				<div
					className={`relative flex flex-col md:flex-row justify-start rounded-3xl bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 px-5 pt-3 md:pb-12`}
				>
					<div className="flex h-72 md:h-full flex-col py-6 mt-6 gap-6">
						<h1 className="mb-5 max-w-[12ch] font-bold leading-[0.85] md:my-auto text-4xl md:text-6xl xl:text-7xl">
							Browse to your heart&apos;s desire!
						</h1>
						<p className="text-lg md:text-3xl">
							From the wide variety of products our company offers, we can
							guarantee that you will find what you are looking for.
						</p>
					</div>
					<div className="mx-auto mb-7 mt-4 box-content aspect-[5/8] w-[100px] min-w-[100px] rounded-full border border-gray-800 dark:border-gray-300 md:my-auto md:-mr-1 md:ml-auto md:w-[150px] md:min-w-[150px] z-20 overflow-hidden">
						<motion.div
							style={{ x, y, scale: imgScale }}
							className="relative w-full h-full flex flex-col justify-center items-center z-10 bg-neutral-100 dark:bg-neutral-900"
						>
							<h1 className="text-xl md:text-2xl lg:text-4xl w-[150%] bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 -skew-x-12 text-center">
								Welcome
							</h1>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
