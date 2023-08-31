"use client";

import style from "./carousel.module.css";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Carousel({ children }) {
	const [width, setWidth] = useState(0);

	const carousel = useRef(null);

	useEffect(() => {
		const w = carousel.current.scrollWidth - carousel.current.offsetWidth;
		setWidth(w);
	}, []);

	return (
		<div className="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 pt-24 min-h-screen px-10 mt-24 w-[90%] mx-auto">
			<motion.div
				ref={carousel}
				className="cursor-grab overflow-hidden"
				whileTap={{ cursor: "grabbing" }}
			>
				<motion.div
					drag="x"
					dragConstraints={{ right: 0, left: -width }}
					className="flex"
				>
					{/* {images.map((image, index) => {
						return (
							<motion.div key={index} className={`relative w-56 h-56 p-10`}>
								<Image
									src={image}
									fill
									alt=""
									className="object-contain object-center w-full h-full rounded-[2rem] pointer-events-none"
								/>
							</motion.div>
						);
					})} */}
					{children}
				</motion.div>
			</motion.div>
		</div>
	);
}
