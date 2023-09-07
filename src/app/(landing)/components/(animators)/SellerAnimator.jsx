"use client";

import { useRef } from "react";

import Link from "next/link";

import formatCurrency from "@/app/utils/formatCurrency";

import { easeInOut, motion, useScroll, useTransform } from "framer-motion";

export default function SellerAnimator({
	product,
	children,
	fromRight = null,
}) {
	const ref = useRef();

	const rtl = useScroll({
		target: ref,
		offset: ["start 80vh", "end 20vh"],
	});

	const ltr = useScroll({
		target: ref,
		offset: ["start 150vh", "end 20vh"],
	});

	const MoveXToLeft = useTransform(
		rtl.scrollYProgress,
		[0, 1],
		["120vw", "-120vw"],
		{
			ease: easeInOut,
		}
	);

	const MoveXToRight = useTransform(
		ltr.scrollYProgress,
		[0, 1],
		["-150vw", "150vw"],
		{
			ease: easeInOut,
		}
	);

	return (
		<motion.div
			key={product.id}
			className={`"flex flex-col gap-3 items-center w-1/3 mx-auto border-4 border-neutral-300 dark:border-neutral-800 rounded-md bg-neutral-300/20 dark:bg-neutral-600/20  my-2"`}
			ref={ref}
			style={{
				x: fromRight ? MoveXToLeft : MoveXToRight,
			}}
		>
			<Link
				className="relative w-full mb-12"
				href={`/catalogue/${product.CategoryId}/${product.ParentId}/${product.ChildId}/${product.id}`}
			>
				<h2 className="absolute right-2 top-2 z-10 rounded-xl bg-red-500 px-3 py-1 text-xs">
					SALE
				</h2>
				<motion.div
					className="mt-4 basis-3/5 cursor-pointer relative h-72 md:h-56 lg:h-40 w-[90%] mx-auto"
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
