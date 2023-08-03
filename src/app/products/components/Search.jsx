"use client";

import { useState, useEffect } from "react";

import useCustomRouter from "@/hooks/useCustomRouter";

import { useIcons } from "@/app/utils/CustomIcons";
import { motion } from "framer-motion";

export default function SearchForm() {
  const [text, setText] = useState({ search: "" });

  const { pushQuery, query } = useCustomRouter();

  useEffect(() => {
    handleSearch(text);
  }, [text]);

  const { SearchIcon } = useIcons();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(text);
  };

  const handleChange = (e) => {
    if (e.target.value) {
      setText(() => ({ search: e.target.value }));
    } else {
      setText(() => ({ search: "" }));
    }
  };
  const handleSearch = (query) => {
    pushQuery(query);
  };
  return (
    <form
      className="flex justify-between relative border border-neutral-600 dark:border-neutral-400 rounded-md "
      onSubmit={handleSubmit}
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
        defaultValue={text.search || query.search || ""}
        onChange={handleChange}
      />
    </form>
  );
}
