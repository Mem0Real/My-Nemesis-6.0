"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import SellerAnimator from "./(animators)/SellerAnimator";

export default function BestSellers({ products, children }) {
	const rtlProducts = products.filter((product, index) => index < 2 && product);
	const ltrProducts = products.filter(
		(product, index) => index >= 2 && product
	);

	return (
		<div className="min-h-screen flex flex-col items-center justify-start py-3 md:py-24 gap-6 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
			{children}
			<div className="relative shadow-myShadow1 shadow-black w-full mx-auto flex flex-col gap-1 justify-center items-center py-20 text-neutral-200">
				<Image
					src="/images/salesBg.webp"
					fill
					sizes="(max-width: 768) 50vw, (max-width: 1024) 100vw"
					className="object-cover object-center"
					priority
					alt="sales"
				/>

				<div className="w-full mx-auto flex justify-center items-center h-full overflow-hidden">
					{rtlProducts.map((product) => {
						return (
							<React.Fragment key={product.id}>
								<SellerAnimator product={product} fromRight={true}>
									<Image
										className="object-contain object-center"
										src={product.images[0]}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
										alt={product.id}
										priority
									/>
								</SellerAnimator>
							</React.Fragment>
						);
					})}
				</div>
				<div className="w-full mx-auto flex justify-center items-center h-full overflow-hidden">
					{ltrProducts.map((product) => {
						return (
							<React.Fragment key={product.id}>
								<SellerAnimator product={product}>
									<Image
										className="object-contain object-center"
										src={product.images[0]}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
										alt={product.id}
										priority
									/>
								</SellerAnimator>
							</React.Fragment>
						);
					})}
				</div>
			</div>
			<Link
				href="/products"
				className="bg-purple-700 rounded-lg px-6 py-2 text-neutral-300 dark:text-neutral-900 hover:bg-neutral-900 dark:hover:bg-neutral-100 transition-all ease-in-out duration-200"
			>
				Browse Products
			</Link>
		</div>
	);
}
