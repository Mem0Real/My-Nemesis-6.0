"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useIcons } from "@/app/utils/CustomIcons";
import Link from "next/link";
import { useSidebarContext } from "../SideBarComponent";
import { MenuChildren } from "./MenuChildren";

export const MenuParents = ({ id, category, childrens }) => {
	const { RightArrowIcon } = useIcons();
	const {
		openParent,
		openChild,
		menuVariants,
		nestedItemVariants,
		buttonVariants,
		toggleChild,
	} = useSidebarContext();

	return (
		<AnimatePresence>
			{openParent?.id === category && openParent?.open === true && (
				<motion.li
					layout="position"
					layoutId={id + "layout"}
					variants={nestedItemVariants}
					initial="closed"
					animate={
						openParent?.id === category && openParent?.open === true
							? "open"
							: "closed"
					}
					exit="closed"
					className="m-0 p-0 mb-5 flex flex-col gap-3 capitalize"
				>
					<motion.div className="flex items-center justify-between ">
						<motion.div
							whileHover={{ scale: 1.2 }}
							whileTap={{ scale: 0.8 }}
							transition={{ ease: "easeInOut", duration: 0.1 }}
						>
							<Link
								href={`/catalogue/${category}/${id}`}
								className="text-lg font-medium cursor-pointer"
							>
								{id}
							</Link>
						</motion.div>
						<motion.button
							whileHover={{ scale: 1.5 }}
							whileTap={{ scale: 0.9 }}
							onClick={() => toggleChild(id)}
							animate={
								openChild?.id === id && openChild?.open ? "open" : "closed"
							}
							variants={buttonVariants}
							initial="closed"
						>
							{RightArrowIcon}
						</motion.button>
					</motion.div>
					<motion.ul variants={menuVariants} className="px-3">
						{childrens?.length > 0 &&
							childrens.map((child) => {
								return (
									<MenuChildren
										key={child.id}
										category={category}
										parent={id}
										id={child.id}
										products={child.items}
									/>
								);
							})}
					</motion.ul>
				</motion.li>
			)}
		</AnimatePresence>
	);
};
