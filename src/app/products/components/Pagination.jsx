"use client";

import { useState } from "react";
import { useProductListContext } from "../ProductList";
import useCustomRouter from "@/hooks/useCustomRouter";

import { motion } from "framer-motion";

export default function Pagination() {
  const { totalPage } = useProductListContext();

  const newArray = [...Array(totalPage)].map((_, i) => i + 1);

  const { pushQuery, query } = useCustomRouter();

  const buttonVariants = {
    selected: {
      borderColor: "rgb(38 38 88)",
      borderWidth: "2px",
    },
    notSelected: {
      borderColor: "rgb(200 200 200)",
      borderWidth: "1px",
    },
  };
  return (
    <div className="flex flex-wrap items-center gap-3 my-6">
      {newArray.map((page) => (
        <motion.button
          key={page}
          onClick={() => pushQuery({ page })}
          className="py-0.5 text-sm w-6 border rounded-md "
          animate={query.page === page ? "selected" : "notSelected"}
          variants={buttonVariants}
        >
          {page}
        </motion.button>
      ))}
    </div>
  );
}
