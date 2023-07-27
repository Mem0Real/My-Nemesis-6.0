"use client";

import { useState, useEffect } from "react";
import { useIcons } from "@/app/utils/CustomIcons";
import { motion } from "framer-motion";
import useCustomRouter from "@/hooks/useCustomRouter";

export default function SearchForm() {
  const { pushQuery, query } = useCustomRouter();
  const [text, setText] = useState({ search: "" });

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
      className="flex justify-between relative"
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
        defaultValue={query.search || ""}
        onChange={(e) => setText({ search: e.target.value })}
      />
    </form>
  );
}
