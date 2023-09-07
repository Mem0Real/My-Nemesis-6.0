"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

const variants = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.2 },
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 },
	},
};

export const Navigation = ({ categories }) => (
	<motion.ul
		variants={variants}
		className="m-0 py-[25px] px-3 absolute top-[70px] left-[10px] w-[90%]"
	>
		{categories.map(({ id, parents }) => (
			<MenuItem id={id} key={id} />
		))}
	</motion.ul>
);

const itemIds = [0, 1, 2, 3, 4];
