"use client";

import Image from "next/image";
import { motion, useTransform, useScroll } from "framer-motion";

const PinOnScroll = () => {
	const { scrollY } = useScroll();
	// const y = useTransform(scrollY, [50, 500, 1000], [0, 400, -100]);
	// const scale = useTransform(scrollY, [0, 1000], [1, 4]);
	const y = useTransform(scrollY, [0, 150], [0, -260]);
	const scale = useTransform(scrollY, [0, 100], [1, 2]);

	const imgY = useTransform(scrollY, [0, 100], [0, 100]);

	return (
		<div className="h-[250vh] pt-24 bg-neutral-100 dark:bg-neutral-900">
			{/* <motion.div
				style={{
					// position: "sticky",
					// bottom: 0,
					// left: 0,
					// right: 0,
					// height: "100px",
					background: "blue",
					opacity: 0.8,
					y: y,
					textAlign: "center",
				}}
				className="h-24 grid place-items-center"
			>
				<motion.h2 className="text-5xl text-black" style={{ scale }}>
					Howdy
				</motion.h2>
			</motion.div> */}

			<div className="relative h-screen w-screen flex flex-col justify-end items-center flex-wrap">
				<motion.div
					className="h-fit w-56 md:w-72 lg:w-fit mx-auto bg-transparent overflow-hidden flex flex-col justify-center items-center"
					style={{ scale, y }}
				>
					<h1 className="text-2xl md:text-3xl lg:text-4xl lg:px-5 rounded-lg italic font-black text-center">
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

export default PinOnScroll;
