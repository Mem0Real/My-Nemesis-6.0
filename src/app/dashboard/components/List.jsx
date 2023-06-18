"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Add from "./Add";
import Edit from "./Edit";

export default function List({ data, create }) {
  const [addModal, showAddModal] = useState(false);
  const [addData, setAddData] = useState({});

  const [editModal, showEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  const handleAdd = (
    entry,
    categoryId = null,
    parentId = null,
    childId = null
  ) => {
    !categoryId && !parentId && !childId && setAddData({ entry: entry });
    categoryId && setAddData({ entry: entry, categories: categoryId });
    parentId && setAddData({ entry: entry, parents: parentId });
    childId && setAddData({ entry: entry, children: childId });
    showAddModal(true);
  };

  const closeAddModal = () => {
    showAddModal(false);
  };

  const handleEdit = (entry, e) => {
    setEditData({ entry: "categories", id: e.target.value });
    showEditModal(true);
  };

  const closeEditModal = () => {
    showEditModal(false);
  };

  const categories = data[0];
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      {categories?.map((category) => {
        return (
          <div key={category.id} className="flex items-center gap-4">
            <h1>{category.name}</h1>
            <button
              onClick={() => handleEdit()}
              className="bg-blue-500 px-2 py-1 rounded"
            >
              Edit
            </button>
          </div>
        );
      })}
      <button
        onClick={() => handleAdd("categories")}
        className="bg-green-500 px-2 py-1 rounded"
      >
        Add
      </button>
      <Add
        modal={addModal}
        closeAddModal={closeAddModal}
        create={create}
        addData={addData}
        setAddData={setAddData}
      />
      <Edit
        modal={editModal}
        closeEditModal={closeEditModal}
        create={create}
        editData={editData}
        setEditData={setEditData}
      />
    </div>
  );
}
