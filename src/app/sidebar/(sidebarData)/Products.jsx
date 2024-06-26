"use client";
import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";
import { useSidebarContext } from "../SideBarComponent";

export default function Products({ category, parent, child, items }) {
	const {
		// products,
		openProduct,
		productSideVariants,
		productItemVariants,
		toggleCategory,
	} = useSidebarContext();
	return (
		<AnimatePresence>
			{openProduct?.id === child && openProduct?.open === true && (
				<motion.aside
					layout="position"
					key="productSb"
					animate={{
						height: "max-content",
						transition: {
							duration: 0.5,
						},
					}}
					exit={{
						transition: {
							delay: 0.5,
							duration: 0.3,
						},
					}}
					className="border border-x-0 border-neutral-700 dark:border-neutral-500 rounded-lg py-5 h-max"
				>
					<motion.div
						key="productContainer"
						className="flex flex-col items-start justify-center gap-4"
						initial="closedProduct"
						animate="openProduct"
						exit="closedProduct"
						variants={productSideVariants}
					>
						{items.map(({ id, name }) => (
							<motion.div
								key={id}
								variants={productItemVariants}
								className=" px-2 capitalize w-full"
							>
								<Link
									href={`/catalogue/${category}/${parent}/${child}/${id}`}
									onClick={toggleCategory}
								>
									{name}
								</Link>
							</motion.div>
						))}
					</motion.div>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
