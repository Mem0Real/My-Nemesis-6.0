"use client";

import { useState, useEffect } from "react";

import useCustomRouter from "@/hooks/useCustomRouter";
import { setCookie, parseCookies } from "nookies";

import { useIcons } from "@/app/utils/CustomIcons";
import { motion } from "framer-motion";

export default function SearchForm() {
  const { pushQuery, query } = useCustomRouter();
  const cookieStore = parseCookies();
  const [text, setText] = useState(
    cookieStore.Search !== undefined
      ? JSON.parse(cookieStore.Search)
      : { search: "" }
  );

  useEffect(() => {
    let searchData;
    if (cookieStore.Search && cookieStore.Search !== undefined) {
      searchData = JSON.parse(cookieStore.Search);
      setText(() => searchData);
      handleSearch(searchData);
    }
  }, []);

  useEffect(() => {
    setCookie(null, "Search", JSON.stringify(text));
  }, [text]);

  useEffect(() => {
    const timeOutId = setTimeout(() => handleSearch(text), 500);
    return () => clearTimeout(timeOutId);
  }, [text]);

  const { SearchIcon } = useIcons();

  async function handleSearch(query) {
    pushQuery(query);
  }
  return (
    <form
      className="flex justify-between relative border border-neutral-600 dark:border-neutral-400 rounded-md "
      action={() => handleSearch(text)}
    >
      <motion.button
        className="absolute left-1 top-0 bottom-0 grid place-content-center cursor-pointer"
        whileHover={{ scale: 1.05 }}
        type="submit"
      >
        {SearchIcon}
      </motion.button>
      <input
        type="search"
        name="search"
        placeholder="Search"
        className="ps-7 pe-2 w-44 py-2 rounded-md"
        defaultValue={query.search || text.search || ""}
        onChange={(e) => setText({ search: e.target.value })}
      />
    </form>
  );
}
