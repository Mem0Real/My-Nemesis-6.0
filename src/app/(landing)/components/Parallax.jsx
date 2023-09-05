"use client";

import Image from "next/image";
import { motion, useTransform, useScroll } from "framer-motion";
import Background from "./Background";

const Parallax = () => {
	const { scrollY } = useScroll();
	const y = useTransform(scrollY, [0, 250], ["5vh", "-50vh"]);
	const scale = useTransform(scrollY, [0, 150], [1, 2]);

	return (
		<div className="relative h-[120vh] bg-neutral-100 dark:bg-neutral-900 z-10">
			<Background />

			<div className="relative h-[100vh] w-screen flex flex-col justify-end items-center flex-wrap">
				<motion.div
					className="h-fit w-56 md:w-72 lg:w-fit mx-auto bg-transparent overflow-hidden flex flex-col justify-center items-center"
					style={{ scale, y }}
				>
					<h1 className="text-2xl md:text-3xl xl:text-4xl lg:px-5 rounded-lg italic font-black text-center text-neutral-800 dark:text-neutral-100">
						Ethio Machineries
					</h1>
				</motion.div>
			</div>
			<motion.div className="absolute inset-0 z-10">
				<Image
					fill
					alt="dark"
					className="object-cover object-bottom"
					src="/images/Building.png"
					sizes="(max-width: 768px) 50vw, (max-width: 1024px) 75vw, (max-width: 1200px) 100vw"
					quality={100}
					priority
				/>
			</motion.div>
		</div>
	);
};

export default Parallax;
