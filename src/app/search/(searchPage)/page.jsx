import { getAll } from "../searchActions";
import filterData from "@/app/utils/filterData";

import Categories from "./(searchData)/Categories";
import Parents from "./(searchData)/Parents";
import Children from "./(searchData)/Children";
import Items from "./(searchData)/Items";

const SearchPage = async ({ searchParams }) => {
	let searchQuery = searchParams ? searchParams.q : null;
	searchQuery = searchQuery.toLowerCase();

	const encodedSearchQuery = encodeURI(searchQuery || "");

	const searchResult = await getAll(encodedSearchQuery);
	function isObjEmpty(obj) {
		return Object.keys(obj).length === 0;
	}

	if (searchResult) {
		const { firstArray, secondArray, thirdArray, fourthArray } = filterData(
			searchQuery,
			searchResult
		);

		return (
			<div className="flex flex-col gap-8 min-h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 pt-24 w-screen">
				<div className="flex justify-end px-3">
					<p className="text-neutral-800 dark:text-neutral-100">
						Showing results for &apos;{searchQuery}&apos;
					</p>
				</div>
				<div className="flex flex-col justify-center items-center gap-8">
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
		return (
			<div className="flex flex-col justify-center items-center gap-8 bg-neutral-100 dark:bg-neutral-800 pt-12">
				<h2 className="text-neutral-800 dark:text-neutral-100 text-lg">
					Please type in a keyword....
				</h2>
			</div>
		);
	}
};

export default SearchPage;
