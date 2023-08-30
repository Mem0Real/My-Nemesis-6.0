import Children from "./Children";
import Link from "next/link";
import { Suspense } from "react";

import { getCollectionData } from "../lib/fetchFunctions";

import ChildLoader from "../components/(loader)/ChildLoader";
import CarouselHolder from "../components/CarouselHolder";
import Titles from "../components/Titles";

export default async function Parents({ categoryId }) {
	let content;
	function isObjEmpty(obj) {
		return Object.keys(obj).length === 0;
	}
	const reference = { CategoryId: categoryId };

	let parentData = await getCollectionData("parents", reference);

	if (isObjEmpty(parentData)) {
		content = (
			<div className="flex flex-col justify-around items-center text-sm w-screen bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 h-fit">
				<h1>Empty</h1>
			</div>
		);
	} else {
		content = parentData.map((parent) => {
			return (
				<div
					key={parent.id}
					className="flex flex-col items-center md:items-start text-sm w-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
				>
					<CarouselHolder>
						<Link
							href={`/catalogue/${categoryId}/${parent.id}`}
							className="flex-none"
						>
							<Titles
								name={parent.name}
								className="pt-5 text-3xl font-bold leading-8 mt-0 mb-5 text-center"
							/>
						</Link>
						<div className="w-full">
							{parent.children.length > 0 ? (
								<Suspense fallback={<ChildLoader />}>
									<Children
										categoryId={categoryId}
										parentId={parent.id}
										childrenData={parent.children}
									/>
								</Suspense>
							) : (
								<div className="h-56 grid place-items-center">
									<h1 className="italic text-neutral-600 dark:text-neutral-400">
										No children
									</h1>
								</div>
							)}
						</div>
					</CarouselHolder>
				</div>
			);
		});
	}
	return (
		<div className="flex flex-col justify-evenly items-center w-screen">
			{content}
		</div>
	);
}
