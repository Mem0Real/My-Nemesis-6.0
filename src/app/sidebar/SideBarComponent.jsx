"use client";

import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "@/hooks/useDimensions";

import { MenuToggle } from "./components/MenuToggle";
import { Navigation } from "./components/Navigation";

const sidebar = {
	open: (height = 1000) => ({
		clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
		transition: {
			type: "spring",
			stiffness: 20,
			restDelta: 2,
		},
	}),
	closed: {
		clipPath: "circle(20px at 30px 30px)",
		transition: {
			delay: 0.5,
			type: "spring",
			stiffness: 400,
			damping: 40,
		},
	},
};

export default function SideBarComponent({ data }) {
	const [isOpen, toggleOpen] = useCycle(false, true);
	const containerRef = useRef(null);
	const { height } = useDimensions(containerRef);

	const categories = data;

	return (
		<motion.nav
			initial={false}
			animate={isOpen ? "open" : "closed"}
			custom={height}
			ref={containerRef}
			className="absolute top-0 left-0 bottom-0 w-[300px] min-h-screen"
		>
			<motion.div
				className="absolute top-0 right-0 bottom-0 w-[300px] bg-white/90 dark:bg-black/90"
				variants={sidebar}
			/>
			<Navigation categories={categories} />
			<MenuToggle toggle={() => toggleOpen()} />
		</motion.nav>
	);
}
