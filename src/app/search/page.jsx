// import searchEverything from "@/libraries/searchEverything";
import { search } from "../searchActions";

import Categories from "./searchData/Categories";
import Parents from "./searchData/Parents";
import Children from "./searchData/Children";
import Items from "./searchData/Items";

const SearchPage = async ({ searchParams }) => {
  let searchQuery = searchParams ? searchParams.q : null;
  searchQuery = searchQuery.toLowerCase();

  const encodedSearchQuery = encodeURI(searchQuery || "");

  const searchResult = await search(encodedSearchQuery);
  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  let categoryContent, parentContent, childContent, itemContent, empty;
  if (searchQuery) {
    if (!isObjEmpty(searchResult[0])) {
      categoryContent = <Categories categories={searchResult[0]} />;
    }
    if (!isObjEmpty(searchResult[1])) {
      parentContent = <Parents parents={searchResult[1]} />;
    }
    if (!isObjEmpty(searchResult[2])) {
      childContent = <Children children={searchResult[2]} />;
    }
    if (!isObjEmpty(searchResult[3])) {
      itemContent = <Items items={searchResult[3]} />;
    }
    return (
      <div className="flex flex-col gap-8 text-zinc-900 mt-2 md:mt-12">
        <div className="flex justify-end px-3">
          <p className="text-zinc-700">Showing results for "{searchQuery}"</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
          {categoryContent}
          {parentContent}
          {childContent}
          {itemContent}
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
