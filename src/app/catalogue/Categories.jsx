import Link from "next/link";
import { Suspense } from "react";
import Parents from "./Parents";

import CategoryLoader from "./components/(loader)/CategoryLoader";

import Titles from "./components/Titles";
import CarouselHolder from "./components/CarouselHolder";
import Header from "../components/Header";

export default function Categories({ categories }) {
	const content = categories.map((category) => {
		return (
			<div
				key={category.id}
				className="flex flex-col items-center md:items-start text-sm mb-1 w-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 my-12"
			>
				<CarouselHolder>
					<Link href={`/catalogue/${category.id}`} className="px-5">
						<Titles
							name={category.name}
							className="pt-5 text-3xl font-bold leading-8 mt-0 mb-5 text-center"
						/>
					</Link>
					{category.parents.length > 0 ? (
						<div className="w-full">
							<Suspense fallback={<CategoryLoader />}>
								<Parents categoryId={category.id} parents={category.parents} />
							</Suspense>
						</div>
					) : (
						<div className="h-56 grid place-items-center">
							<h1 className="italic text-neutral-600 dark:text-neutral-400">
								No Parents
							</h1>
						</div>
					)}
				</CarouselHolder>
			</div>
		);
	});

	return (
		<div className="flex flex-col justify-evenly items-center w-screen">
			<div className="w-full flex flex-col items-center justify-center py-8 md:py-10 lg:py-12 mb-2 shadow-xl shadow-blue-600/20 dark:shadow-blue-400/10 text-neutral-800 dark:text-neutral-200 backdrop-blur-sm bg-neutral-200/40 dark:bg-neutral-800/40">
				<Header title="Catalogue" className="font-extralight italic" />
			</div>
			{content}
		</div>
	);
}
