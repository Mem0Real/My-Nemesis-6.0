"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Carousel({ length, children }) {
	console.log(length);
	const [width, setWidth] = useState(0);

	const carousel = useRef(null);

	useEffect(() => {
		const w = carousel.current.scrollWidth - carousel.current.offsetWidth;
		setWidth(w);
	}, []);

	return (
		<motion.div
			ref={carousel}
			className="cursor-grab overflow-hidden"
			whileTap={{ cursor: "grabbing" }}
		>
			<motion.div
				drag="x"
				dragConstraints={{ right: 0, left: -width }}
				className={`flex gap-12 items-center ${length < 4 && "justify-center"}`}
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
	);
}
