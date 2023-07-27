"use client";

import { useState } from "react";
import { useProductListContext } from "../productList";

export default function Pagination() {
  const { totalPage } = useProductListContext();

  const newArray = [...Array(totalPage)].map((_, i) => i + 1);
  return (
    <div className="">
      {newArray.map((page) => (
        <button key={page}>{page}</button>
      ))}
    </div>
  );
}
