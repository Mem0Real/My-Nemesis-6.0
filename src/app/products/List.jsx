"use client";

import Pagination from "../components/Pagination";
import { useState } from "react";

export default function List({ data }) {
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col">
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
}
