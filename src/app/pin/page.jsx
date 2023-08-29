"use client";

import { motion, useTransform, useScroll } from "framer-motion";
const PinOnScroll = () => {
	const { scrollY } = useScroll();
	const y = useTransform(scrollY, [50, 500, 1000], [0, 400, -100]); // Adjust the values as per your requirement
	const scale = useTransform(scrollY, [0, 1000], [1, 5]);
	return (
		<div className="h-[250vh] mt-24">
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

			<div className="h-screen w-screen flex flex-col justify-center items-center">
				<motion.div
					className="h-fit w-fit bg-purple-600 overflow-hidden"
					style={{ scale, y }}
				>
					<h1 className="text-6xl px-5 rounded-lg italic font-black">Hola</h1>
				</motion.div>
			</div>
		</div>
	);
};

export default PinOnScroll;
