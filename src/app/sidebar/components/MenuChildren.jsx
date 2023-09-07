"use client";

import * as React from "react";
import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";

import { useIcons } from "@/app/utils/CustomIcons";
import { useSidebarContext } from "../SideBarComponent";
import { MenuProducts } from "./MenuProducts";

export const MenuChildren = ({ id, category, parent, products }) => {
	const { RightArrowIcon } = useIcons();
	const {
		openChild,
		openProduct,
		menuVariants,
		nestedItemVariants,
		buttonVariants,
		toggleProduct,
	} = useSidebarContext();

	return (
		<AnimatePresence>
			{openChild?.id === parent && openChild?.open === true && (
				<motion.li
					layout="position"
					layoutId={id + "layout"}
					variants={nestedItemVariants}
					initial="closed"
					animate={
						openChild?.id === parent && openChild?.open === true
							? "open"
							: "closed"
					}
					exit="closed"
					className="m-0 p-0 mb-5 flex flex-col gap-1 capitalize"
				>
					<motion.div className="flex items-center justify-between ">
						<motion.div
							whileHover={{ scale: 1.2 }}
							whileTap={{ scale: 0.8 }}
							transition={{ ease: "easeInOut", duration: 0.1 }}
						>
							<Link
								href={`/catalogue/${category}/${parent}/${id}`}
								className="text-base font-normal cursor-pointer"
							>
								{id}
							</Link>
						</motion.div>
						<motion.button
							whileHover={{ scale: 1.5 }}
							whileTap={{ scale: 0.9 }}
							onClick={() => toggleProduct(id)}
							animate={
								openProduct?.id === id && openProduct?.open ? "open" : "closed"
							}
							variants={buttonVariants}
							initial="closed"
						>
							{RightArrowIcon}
						</motion.button>
					</motion.div>
					<motion.ul variants={menuVariants} className="px-3">
						{products?.length > 0 ? (
							products.map((product) => {
								return (
									<MenuProducts
										key={product.id}
										category={category}
										parent={parent}
										child={id}
										id={product.id}
										name={product.name}
									/>
								);
							})
						) : (
							<motion.li
								variants={nestedItemVariants}
								initial="closed"
								animate={
									openProduct?.id === id && openProduct.open === true
										? "open"
										: "closed"
								}
								exit="closed"
							>
								<motion.h1 className="flex justify-center items-center text-sm font-light italic">
									Empty
								</motion.h1>
							</motion.li>
						)}
					</motion.ul>
				</motion.li>
			)}
		</AnimatePresence>
	);
};
