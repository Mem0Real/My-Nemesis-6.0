import { getAll } from "./searchActions";
import filterData from "../utils/filterData";

import Categories from "./Categories";
import Parents from "./Parents";
import Children from "./Children";
import Items from "./Items";

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
      <div className="flex flex-col gap-8 text-zinc-900 mt-2 md:mt-12">
        <div className="flex justify-end px-3">
          <p className="text-zinc-700">
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
            <Children>{thirdArray}</Children>
          )}
          {fourthArray && !isObjEmpty(fourthArray) && (
            <Items>{fourthArray} </Items>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center gap-8 text-zinc-900 mt-2 md:mt-12">
        <h2 className="text-zinc-900">Please type in a keyword....</h2>
      </div>
    );
  }
};

export default SearchPage;
