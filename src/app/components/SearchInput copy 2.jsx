"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getData from "./getData";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchResults from "./SearchResults";

const SearchInput = () => {
  let content;

  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const [searchList, showSearchList] = useState(false);

  const [filteredCategoryData, setFilteredCategoryData] = useState();
  const [filteredParentData, setFilteredParentData] = useState();
  const [filteredChildData, setFilteredChildrenData] = useState();
  const [filteredItemData, setFilteredItemData] = useState();

  const onSearch = (e) => {
    e.preventDefault();
    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
  };

  const handleFilter = async (e) => {
    if (e.target.value === "") showSearchList(false);
    else {
      showSearchList(true);
    }

    const searchWord = e.target.value.toLowerCase();
    setSearchQuery(searchWord);

    if (data) {
      const firstArray = data[0].filter((val) => {
        let query = val.name.toLowerCase();

        return query.includes(searchWord);
      });

      const secondArray = data[1].filter((val) => {
        let query = val.name.toLowerCase();

        return query.includes(searchWord);
      });

      const thirdArray = data[2].filter((val) => {
        let query = val.name.toLowerCase();

        return query.includes(searchWord);
      });

      const fourthArray = data[3].filter((val) => {
        let query = val.name.toLowerCase();

        return query.includes(searchWord);
      });

      setFilteredCategoryData(firstArray);
      setFilteredParentData(secondArray);
      setFilteredChildrenData(thirdArray);
      setFilteredItemData(fourthArray);
    }
  };

  const { data, error, isLoading } = getData();

  if (error) content = <div>Failed to load</div>;
  else if (isLoading) content = <div>loading...</div>;
  else
    content = (
      <SearchResults
        filteredCategoryData={filteredCategoryData}
        filteredParentData={filteredParentData}
        filteredChildData={filteredChildData}
        filteredItemData={filteredItemData}
      />
    );
  return (
    <div className="flex flex-col justify-center items-center relative">
      <form className="inline-flex justify-center">
        <input
          value={searchQuery}
          type="text"
          className="px-2 md:pl-4 md:pr-16 py-3 w-full rounded-md sm:py-2 flex-1 text-zinc-200 bg-zinc-800"
          placeholder="Search products..."
          onChange={handleFilter}
        />
        <button type="submit" className="-ml-6" onClick={onSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
      {searchList && content}
    </div>
  );
};

export default SearchInput;
