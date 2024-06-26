"use client";

import React, { useState } from "react";
import Link from "next/link";

import Parent from "./Parent";

import { useDataContext } from "../List";
import { useTableContext } from "../ListTable";

import { AnimatePresence, motion } from "framer-motion";

import { useIcons } from "@/app/utils/CustomIcons";

export default function Category({ category }) {
	const { handleAdd, handleEdit, handleDelete } = useDataContext();
	const {
		parentData,
		catDropDown,
		cat,
		buttonVariants,
		dropVariants,
		toggleCatDrop,
	} = useTableContext();

	const { RightArrowIcon, PlusIcon, EditIcon, DeleteIcon } = useIcons();

	const matchingParents = parentData.filter(
		({ CategoryId }) => CategoryId === category.id
	);

	let content;
	if (matchingParents.length === 0) {
		content = cat.id === category.id && cat.open === true && (
			<tr key={`${category.id}-empty`}>
				<td
					colSpan={3}
					align="center"
					className="py-5 bg-neutral-200 dark:bg-neutral-700 text-sm italic font-extralight tracking-wider"
				>
					Empty
				</td>
			</tr>
		);
	}

	return [
		<AnimatePresence key={category.id}>
			<motion.tr
				key={category.id}
				className={`cursor-pointer bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 ${
					cat.id === category.id && cat.open === true && "font-semibold"
				}`}
				onClick={() => toggleCatDrop(category.id)}
			>
				<motion.td
					className="flex items-center justify-start gap-3"
					height="50"
				>
					<motion.div
						className={`text-sm text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 hover:dark:text-neutral-400 `}
						animate={
							cat.id === category.id && cat.open === true ? "open" : "close"
						}
						initial="close"
						exit="close"
						variants={buttonVariants}
					>
						{RightArrowIcon}
					</motion.div>
					<motion.div
						whileHover={{ scale: 1.02 }}
						onClick={(e) => e.stopPropagation()}
					>
						<Link
							className="hover:underline underline-offset-4 z-10"
							href={`catalogue/${category.id}`}
						>
							{category.name}
						</Link>
					</motion.div>
				</motion.td>
				<td className="max-w-36 text-center md:text-start">
					{category.description}
				</td>
				<td
					className="flex items-center justify-center gap-3"
					onClick={(e) => e.stopPropagation()}
				>
					<motion.div
						whileHover={{
							scale: 1.3,
						}}
						whileTap={{
							scale: 1,
						}}
						className="text-green-700 text-base cursor-pointer"
						onClick={() => handleAdd("parents", category.id)}
					>
						{PlusIcon}
					</motion.div>

					<motion.div
						className="text-blue-700 text-base cursor-pointer"
						onClick={() => handleEdit("categories", category)}
						whileHover={{
							scale: 1.3,
						}}
						whileTap={{
							scale: 1,
						}}
					>
						{EditIcon}
					</motion.div>

					<motion.div
						className="text-red-700 text-base cursor-pointer"
						onClick={() => handleDelete("categories", category)}
						whileHover={{
							scale: 1.3,
						}}
						whileTap={{
							scale: 1,
						}}
					>
						{DeleteIcon}
					</motion.div>
				</td>
			</motion.tr>
		</AnimatePresence>,
		content
			? content
			: parentData.map(
					(parent) =>
						parent.CategoryId === category.id && (
							<React.Fragment key={parent.id}>
								<Parent categoryId={category.id} parent={parent} />
							</React.Fragment>
						)
			  ),
	];
}
