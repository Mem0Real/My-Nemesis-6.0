"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MenuItems } from "./MenuItems";
import { useSidebarContext } from "../SideBarComponent";

export const Navigation = ({ categories, open }) => {
	const { menuVariants } = useSidebarContext();
	return (
		<AnimatePresence>
			{open && (
				<motion.ul
					variants={menuVariants}
					className="m-0 pt-24 pb-6 px-3 w-[90%] z-10"
					exit="closed"
				>
					{categories.map(({ id, parents }) => (
						<MenuItems id={id} key={id} parents={parents} />
					))}
				</motion.ul>
			)}
		</AnimatePresence>
	);
};
