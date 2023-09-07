"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useSidebarContext } from "../SideBarComponent";

export const MenuProducts = ({ id, name, category, parent, child }) => {
	const { openProduct, nestedItemVariants } = useSidebarContext();

	return (
		<AnimatePresence>
			{openProduct?.id === child && openProduct?.open === true && (
				<motion.li
					layout="position"
					layoutId={id + "layout"}
					variants={nestedItemVariants}
					initial="closed"
					animate={
						openProduct?.id === child && openProduct?.open === true
							? "open"
							: "closed"
					}
					exit="closed"
					className="m-0 p-0 my-5 flex items-center justify-start capitalize text-sm"
				>
					<motion.div
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.8 }}
						transition={{ ease: "easeInOut", duration: 0.1 }}
					>
						<Link
							href={`/catalogue/${category}/${parent}/${id}`}
							className="italic font-thin cursor-pointer"
						>
							{name}
						</Link>
					</motion.div>
				</motion.li>
			)}
		</AnimatePresence>
	);
};
