"use client";

import { motion, useTransform, useScroll } from "framer-motion";
const PinOnScroll = () => {
	const { scrollY } = useScroll();
	const y = useTransform(scrollY, [0, 1000], [0, 1000]); // Adjust the values as per your requirement
	const scale = useTransform(scrollY, [0, 1000], [1, 5]);
	return (
		<div className="h-[250vh] mt-24">
			<motion.div
				style={{
					position: "sticky",
					top: 0,
					left: 0,
					right: 0,
					height: "100px",
					background: "blue",
					opacity: 0.8,
					y: y,
					textAlign: "center",
				}}
			>
				{/* Content inside the pinned element */}
				<motion.h2 className="text-5xl text-black" style={{ scale }}>
					Howdy
				</motion.h2>
			</motion.div>
		</div>
	);
};

export default PinOnScroll;
