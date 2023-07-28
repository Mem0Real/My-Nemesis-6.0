"use client";

import { useState } from "react";
import { useProductListContext } from "../productList";
import useCustomRouter from "@/hooks/useCustomRouter";

import { motion } from "framer-motion";

export default function Pagination() {
  const { totalPage } = useProductListContext();

  const newArray = [...Array(totalPage)].map((_, i) => i + 1);

  const { pushQuery, query } = useCustomRouter();

  const buttonVariants = {
    selected: {
      borderColor: "blue",
      borderWidth: "2px",
    },
    notSelected: {
      borderColor: "",
      borderWidth: "1px",
    },
  };
  return (
    <div className="flex flex-wrap items-center gap-3">
      {newArray.map((page) => (
        <motion.button
          key={page}
          onClick={() => pushQuery({ page })}
          className="py-0.5 text-sm w-6 border border-neutral-800 dark:border-neutral-200 rounded-md "
          animate={query.page === page ? "selected" : "notSelected"}
          variants={buttonVariants}
        >
          {page}
        </motion.button>
      ))}
    </div>
  );
}
