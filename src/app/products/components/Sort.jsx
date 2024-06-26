"use client";
import { motion } from "framer-motion";
import useCustomRouter from "@/hooks/useCustomRouter";
import { useState, useEffect } from "react";

export default function Sort() {
  const { pushQuery, query } = useCustomRouter();
  const [sort, setSort] = useState({ sort: "" });

  useEffect(() => {
    async function handleSort(query) {
      pushQuery(query);
    }
    handleSort(sort);
  }, [sort]);

  return (
    <motion.select
      defaultValue="asc"
      onChange={(e) => setSort({ sort: e.target.value })}
      className="px-2 py-1 rounded-md border-b border-neutral-800 dark:border-neutral-200 text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 disabled:text-neutral-800 dark:disabled:text-neutral-800 disabled:bg-neutral-800 cursor-pointer outline-none"
    >
      <option value="asc" disabled>
        Sort By
      </option>
      <option value="asc">Name (asc)</option>
      <option value="desc">Name (desc)</option>
    </motion.select>
  );
}
