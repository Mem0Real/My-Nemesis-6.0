"use client";

import { useState } from "react";
import { useProductListContext } from "../productList";
import useCustomRouter from "@/hooks/useCustomRouter";

export default function Pagination() {
  const { totalPage } = useProductListContext();

  const newArray = [...Array(totalPage)].map((_, i) => i + 1);

  const { pushQuery, query } = useCustomRouter();

  return (
    <div className="">
      {newArray.map((page) => (
        <button key={page} onClick={() => pushQuery({ page })}>
          {page}
        </button>
      ))}
    </div>
  );
}
