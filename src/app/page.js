import Image from "next/image";
import Link from "next/link";

import TopMask from "./(landing)/components/TopMask";
import BottomMask from "./(landing)/components/BottomMask";
import BodySection from "./(landing)/components/(sections)/BodySection";
import Parallax from "./(landing)/components/Parallax";
import TouchSmoothScroller from "./components/TouchSmoothScroller";

import { fetchProducts, fetchCategories } from "./(landing)/util/getData";
import Company from "./(landing)/components/Company";
import BestSellers from "./(landing)/components/BestSellers";
import TextAnimation from "./(landing)/components/(animators)/TextAnimation";

// TODO Design skeleton for landing page
export default async function Home() {
	const categoryData = fetchCategories();
	const productData = fetchProducts();
	const [categories, products] = await Promise.all([categoryData, productData]);

	return (
		<>
			<TouchSmoothScroller />
			<div className="relative min-h-screen h-fit min-w-screen flex flex-col items-center justify-center gap-0 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 z-0">
				<Parallax />

				<div className="bg-neutral-100 dark:bg-neutral-800 z-20 mx-auto pt-28 pb-12 w-screen backdrop-blur-lg">
					<TopMask />
					{/* <BodySection /> */}
					<Company />

					<BestSellers products={products}>
						<TextAnimation
							className="text-4xl md:text-5xl font-semibold my-5 pb-5"
							sentence="Best Sellers"
						/>
					</BestSellers>
					<BottomMask />
				</div>
			</div>
		</>
	);
}
