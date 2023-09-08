"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useIcons } from "@/app/utils/CustomIcons";
import Link from "next/link";
import { useSidebarContext } from "../SideBarComponent";
import { MenuParents } from "./MenuParents";

export const MenuItems = ({ id, parents }) => {
	const { RightArrowIcon } = useIcons();
	const {
		openParent,
		itemVariants,
		buttonVariants,
		menuVariants,
		toggleParent,
	} = useSidebarContext();

	return (
		<motion.li
			variants={itemVariants}
			className="m-0 p-0 mb-5 w-full flex flex-col gap-5 capitalize"
		>
			<motion.div className="flex items-center justify-between ">
				<motion.div
					whileHover={{ scale: 1.2 }}
					whileTap={{ scale: 0.8 }}
					transition={{ ease: "easeInOut", duration: 0.1 }}
				>
					<Link
						href={`/catalogue/${id}`}
						className="text-xl font-bold cursor-pointer"
					>
						{id}
					</Link>
				</motion.div>
				<motion.button
					whileHover={{ scale: 1.5 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => toggleParent(id)}
					animate={
						openParent?.id === id && openParent?.open ? "open" : "closed"
					}
					variants={buttonVariants}
					initial="closed"
				>
					{RightArrowIcon}
				</motion.button>
			</motion.div>
			<motion.ul variants={menuVariants} className="px-3">
				{parents?.length > 0 &&
					parents.map((parent) => {
						return (
							<MenuParents
								key={parent.id}
								id={parent.id}
								category={id}
								childrens={parent.children}
							/>
						);
					})}
			</motion.ul>
		</motion.li>
	);
};
