import Link from "next/link";
import { Suspense } from "react";

import { getCollectionData } from "@/app/catalogue/lib/fetchFunctions";
import Images from "./Images";
import CarouselHolder from "@/app/catalogue/components/CarouselHolder";
import Titles from "@/app/catalogue/components/Titles";

export default async function Items({ categoryId, parentId, childId }) {
	let content;

	const reference = { ChildId: childId };

	function isObjEmpty(obj) {
		return Object.keys(obj).length === 0;
	}
	let itemsData = await getCollectionData("items", reference);

	if (isObjEmpty(itemsData)) {
		content = (
			<div className="flex flex-col justify-around items-center text-sm mb-1 w-screen bg-neutral-300 text-neutral-900 h-fit">
				<h1>Empty</h1>
			</div>
		);
	} else {
		content = itemsData.map((item) => {
			return (
				<div
					key={item.id}
					className="flex flex-col items-center md:items-start text-sm mb-1 w-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
				>
					<CarouselHolder>
						<Link
							href={`/catalogue/${categoryId}/${parentId}/${childId}/${item.id}`}
							className="flex-none"
						>
							<Titles
								name={item.name}
								className="text-3xl font-bold leading-8 mt-0 mb-5 text-center"
							/>
						</Link>
						<div className="w-full">
							<Suspense
								fallback={
									<h1 className="text-md text-center mx-auto">
										Loading Images...
									</h1>
								}
							>
								<div className="group mx-auto w-[95%] border border-neutral-300 rounded-3xl shadow-neutral-400 hover:shadow-neutral-600 dark:shadow-neutral-900 dark:hover:shadow-black dark:border-neutral-700">
									<Images
										categoryId={categoryId}
										parentId={parentId}
										childId={childId}
										itemId={item.id}
										images={item.images}
									/>
								</div>
							</Suspense>
						</div>
					</CarouselHolder>
				</div>
			);
		});
	}
	return content;
}
