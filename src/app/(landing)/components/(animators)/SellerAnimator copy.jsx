"use client";

import { useRef } from "react";

import Link from "next/link";

import formatCurrency from "@/app/utils/formatCurrency";

import { motion, useScroll, useTransform } from "framer-motion";

export default function SellerAnimator({ product, children }) {
	const ref = useRef();

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end center"],
	});

	const y = useTransform(scrollYProgress, [0, 0.5], [150, 0]);
	const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);

	return (
		<motion.div
			key={product.id}
			className="flex flex-col gap-3 items-center w-full md:w-80 lg:w-72 mx-auto border border-neutral-300 dark:border-neutral-700 my-2"
			ref={ref}
			style={{ y, opacity }}
		>
			<Link
				className="relative w-full mb-12"
				href={`/catalogue/${product.CategoryId}/${product.ParentId}/${product.ChildId}/${product.id}`}
			>
				<h2 className="absolute right-2 top-2 z-10 rounded-xl bg-red-500 px-3 py-1 text-xs">
					SALE
				</h2>
				<motion.div
					className="mt-4 basis-3/5 cursor-pointer relative h-72 md:h-56 lg:h-44 w-[90%] mx-auto"
					whileHover={{
						scale: 1.1,
						transition: { duration: 0.4, ease: "easeInOut" },
					}}
				>
					{children}
				</motion.div>
			</Link>
			<Link
				className="basis-1/5 self-start"
				href={`/catalogue/${product.CategoryId}/${product.ParentId}/${product.ChildId}/${product.id}`}
			>
				<h1 className="text-lg font-medium px-3">{product.name}</h1>
			</Link>
			<h1 className="basis-1/5 self-start flex items-center gap-1.5 text-base text-green-600 dark:text-green-400 px-3 pb-3">
				{formatCurrency(product.price)}
			</h1>
		</motion.div>
	);
}
