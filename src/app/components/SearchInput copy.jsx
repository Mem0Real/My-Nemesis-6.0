"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchInput = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR("/api/getAll", fetcher);

  let content;

  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const [showSearchList, setShowSearchList] = useState(false);
  const [results, setResults] = useState({});

  const onSearch = (e) => {
    e.preventDefault();
    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
  };
  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setSearchQuery(searchWord);
    // const filteredCategories = data[0]?.filter((val) => {
    //   return val.name.includes(searchWord) || val.id.includes(searchWord);
    // });
    // const filteredParents = data[1]?.filter((val) => {
    //   return val.name.includes(searchWord) || val.id.includes(searchWord);
    // });
    // const filteredChildren = data[2]?.filter((val) => {
    //   return val.name.includes(searchWord) || val.id.includes(searchWord);
    // });
    // const filteredItems = data[3]?.filter((val) => {
    //   return val.name.includes(searchWord) || val.id.includes(searchWord);
    // });
    const filteredItems = data[0].filter((val) => {
      return val.name.includes(searchWord);
    });

    setResults(filteredItems);
  };

  if (error && results) content = <div>failed to load</div>;
  else if (isLoading) content = <div>loading...</div>;
  else
    content = (
      <div className="absolute top-96 w-96 text-center mt-5 overflow-y-scroll no-scrollbar">
        <h1>{results.name}</h1>
      </div>
    );
  return (
    <div className="flex flex-col justify-center items-center relative">
      <form className="inline-flex justify-center">
        <input
          value={searchQuery}
          // onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          className="px-2 md:pl-4 md:pr-16 py-3 w-full rounded-md sm:py-2 flex-1 text-zinc-200 bg-zinc-800"
          placeholder="Search products..."
          onChange={handleFilter}
        />
        <button type="submit" className="-ml-6" onClick={onSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
      {content}
    </div>
  );
};

export default SearchInput;
