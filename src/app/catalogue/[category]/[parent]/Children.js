import Link from "next/link";
import { Suspense } from "react";

import { getCollectionData } from "@/app/catalogue/lib/fetchFunctions";
import Items from "./Items";
import ItemLoader from "../../components/(loader)/ItemLoader";
import CarouselHolder from "../../components/CarouselHolder";
import Titles from "../../components/Titles";

export default async function Children({ categoryId, parentId }) {
	let content;

	const reference = { ParentId: parentId };

	function isObjEmpty(obj) {
		return Object.keys(obj).length === 0;
	}
	let childData = await getCollectionData("children", reference);

	if (isObjEmpty(childData)) {
		content = (
			<div className="flex flex-col justify-around items-center text-lg mb-1 w-screen bg-neutral-800 text-neutral-200 h-fit">
				<h1>Empty Child</h1>
			</div>
		);
	} else {
		content = childData.map((child) => {
			return (
				<div
					key={child.id}
					className="flex flex-col items-center md:items-start text-sm mb-1 w-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
				>
					<CarouselHolder>
						<Link
							href={`/catalogue/${categoryId}/${parentId}/${child.id}`}
							className="flex-none"
						>
							<Titles
								name={child.name}
								className="pt-5 text-3xl font-bold leading-8 mt-0 mb-5 text-center"
							/>
						</Link>
						<div className="w-full">
							{child.items.length > 0 ? (
								<Suspense fallback={<ItemLoader />}>
									<div className="group mx-auto w-[95%] border border-neutral-300 rounded-3xl shadow-neutral-400 hover:shadow-neutral-600 dark:shadow-neutral-900 dark:hover:shadow-black dark:border-neutral-700">
										<Items
											categoryId={categoryId}
											parentId={parentId}
											childId={child.id}
											items={child.items}
										/>
									</div>
								</Suspense>
							) : (
								<div className="h-56 grid place-items-center">
									<h1 className="italic text-neutral-600 dark:text-neutral-400">
										No Items
									</h1>
								</div>
							)}
						</div>
					</CarouselHolder>
				</div>
			);
		});
	}
	return content;
}
