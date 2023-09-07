"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useIcons } from "@/app/utils/CustomIcons";
import Link from "next/link";

const variants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 },
		},
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 },
		},
	},
};

export const MenuItem = ({ id, parents }) => {
	const { RightArrowIcon } = useIcons();

	return (
		<motion.li
			variants={variants}
			className="m-0 p-0 mb-5 flex items-center justify-between cursor-pointer capitalize text-xl"
		>
			<motion.div
				whileHover={{ scale: 1.2 }}
				whileTap={{ scale: 0.8 }}
				transition={{ ease: "easeInOut", duration: 0.1 }}
			>
				<Link href={`/catalogue/${id}`}>{id}</Link>
			</motion.div>
			<motion.button whileHover={{ scale: 1.5 }} whileTap={{ scale: 0.9 }}>
				{RightArrowIcon}
			</motion.button>
		</motion.li>
	);
};
