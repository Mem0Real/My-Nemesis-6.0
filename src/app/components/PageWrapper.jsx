"use client";
import { motion } from "framer-motion";
// import SmoothScroller from "./SmoothScroller";

export default function PageWrapper({ children }) {
	return (
		<>
			{/* <SmoothScroller /> */}
			<motion.div
				className="min-h-screen bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 pt-12"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 30 }}
				transition={{
					delayChildren: 0.5,
					staggerDirection: -1,
					duration: 0.5,
					ease: "backIn",
				}}
			>
				{children}
			</motion.div>
		</>
	);
}
