"use client";
import { motion } from "framer-motion";
import useCustomRouter from "@/hooks/useCustomRouter";
import { useState, useEffect } from "react";

export default function Sort() {
  const { pushQuery, query } = useCustomRouter();
  const [sort, setSort] = useState({ sort: "" });

  useEffect(() => {
    handleSort(sort);
  }, [sort]);

  async function handleSort(query) {
    pushQuery(query);
  }
  return (
    <div className="flex flex-col gap-3">
      <p className="mr-2">Order By</p>
      <motion.select
        defaultValue="asc"
        onChange={(e) => setSort({ sort: e.target.value })}
        className="px-2 py-1 rounded-md border-b border-neutral-800 dark:border-neutral-200 cursor-pointer"
        initial={{ borderWidth: "1px", borderBottomWidth: "2px" }}
        whileTap={{
          borderBottomWidth: "1px",
          transition: { duration: 0.2, ease: "linear" },
        }}
      >
        <option value="asc">Name (asc)</option>
        <option value="desc">Name (desc)</option>
      </motion.select>
    </div>
  );
}
