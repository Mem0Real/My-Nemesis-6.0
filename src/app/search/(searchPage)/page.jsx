import { getAll, search } from "../searchActions";
import filterData from "@/app/utils/filterData";

import Categories from "./(searchData)/Categories";
import Parents from "./(searchData)/Parents";
import Children from "./(searchData)/Children";
import Items from "./(searchData)/Items";
import Image from "next/image";

const SearchPage = async ({ searchParams }) => {
	let searchQuery, searchResult;

	if (searchParams && searchParams.q) {
		searchQuery = searchParams && searchParams.q ? searchParams.q : null;
		searchQuery = searchQuery.toLowerCase();

		const encodedSearchQuery = encodeURI(searchQuery || "");

		searchResult = await getAll(encodedSearchQuery);
	}

	function isObjEmpty(obj) {
		return Object.keys(obj).length === 0;
	}

	let content;

	if (searchResult) {
		const { firstArray, secondArray, thirdArray, fourthArray } = filterData(
			searchQuery,
			searchResult
		);

		content = (
			<div className="flex flex-col gap-8 min-h-screen bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 lg:pt-24 pb-12 w-screen">
				<div className="flex justify-end px-3">
					<p className="text-neutral-800 dark:text-neutral-100">
						Showing results for &apos;{searchQuery}&apos;
					</p>
				</div>
				<div className="flex flex-col justify-center items-center gap-8 text-center">
					{firstArray && !isObjEmpty(firstArray) && (
						<Categories>{firstArray}</Categories>
					)}
					{secondArray && !isObjEmpty(secondArray) && (
						<Parents>{secondArray}</Parents>
					)}
					{thirdArray && !isObjEmpty(thirdArray) && (
						<Children data={searchResult}>{thirdArray}</Children>
					)}
					{fourthArray && !isObjEmpty(fourthArray) && (
						<Items data={searchResult}>{fourthArray} </Items>
					)}
				</div>
			</div>
		);
	} else {
		content = (
			<div className="flex flex-col justify-center items-center gap-8 bg-neutral-100 dark:bg-neutral-800 lg:pt-12 min-h-screen w-screen">
				<h2 className="text-neutral-800 dark:text-neutral-100 text-lg">
					Please type in a keyword....
				</h2>
			</div>
		);
	}

	return (
		<div className="relative bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 pt-24">
			<div className="bg-neutral-100/20 dark:bg-neutral-900/20 backdrop-blur-lg z-10">
				{content}
			</div>
			<div className="absolute -top-28 md:top-10 left-0 w-1/2 h-1/2">
				<Image
					src={"/images/SearchBg.png"}
					alt="Search"
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
					className="object-contain object-center z-0"
				/>
			</div>
		</div>
	);
};

export default SearchPage;
