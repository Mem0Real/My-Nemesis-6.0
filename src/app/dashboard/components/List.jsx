"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Add from "./Add";

export default function List({ data, create }) {
  const [addModal, showAddModal] = useState(false);
  const [addData, setAddData] = useState({});

  const handleAdd = () => {
    setAddData({ entry: "categories" });
    showAddModal(true);
  };

  const closeAddModal = () => {
    showAddModal(false);
  };

  const categories = data[0];
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      {categories?.map((category) => {
        return (
          <div key={category.id} className="flex items-center gap-4">
            <h1>{category.name}</h1>
          </div>
        );
      })}
      <button
        onClick={() => handleAdd()}
        className="bg-green-500 px-2 py-1 rounded"
      >
        Add
      </button>
      <Add modal={addModal} closeAddModal={closeAddModal} create={create} />
    </div>
  );
}
