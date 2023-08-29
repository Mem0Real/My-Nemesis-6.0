"use client";

import Image from "next/image";
import { motion, useTransform, useScroll } from "framer-motion";
import Background from "./Background";

const Parallax = () => {
	const { scrollY } = useScroll();
	const y = useTransform(scrollY, [0, 260], [0, -260]);
	const scale = useTransform(scrollY, [0, 150], [1, 2]);

	const imgY = useTransform(scrollY, [0, 100], [0, 110]);

	return (
		<div className="h-[116vh] bg-neutral-100 dark:bg-neutral-900 z-10">
			<Background />

			<div className="relative h-screen w-screen flex flex-col justify-end items-center flex-wrap">
				<motion.div
					className="h-fit w-56 md:w-72 lg:w-fit mx-auto bg-transparent overflow-hidden flex flex-col justify-center items-center"
					style={{ scale, y }}
				>
					<h1 className="text-2xl md:text-3xl lg:text-4xl lg:px-5 rounded-lg italic font-black text-center text-neutral-800 dark:text-neutral-100">
						Ethio Machineries
					</h1>
				</motion.div>
				<motion.div className="absolute inset-0 z-10" style={{ y: imgY }}>
					<Image
						fill
						alt="dark"
						className="object-cover object-bottom"
						src="/images/Building.png"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
						quality={100}
						priority
					/>
				</motion.div>
			</div>
		</div>
	);
};

export default Parallax;
