"use client";

import dynamic from "next/dynamic";
import { useState, createContext, useContext } from "react";
import { Suspense } from "react";

import Button from "@mui/material/Button";
const Add = dynamic(() => import("./Add"));
const Edit = dynamic(() => import("./Edit"));
const Delete = dynamic(() => import("./Delete"));
// import ListTable from "./ListTable";
import MyTable from "./MyTable";

const DataContext = createContext({});

export default function List({ data, create, update, deleteItem, url }) {
  const [addModal, showAddModal] = useState(false);
  const [addData, setAddData] = useState({});

  const [editModal, showEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  const [deleteAlert, showDeleteAlert] = useState(false);
  const [deleteData, setDeleteData] = useState({});

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

  const handleEdit = (entry, data = null) => {
    let ref = { name: undefined, val: undefined };

    if (data.ChildId) {
      ref = { name: "ChildId", val: data.ChildId };
    } else if (data.ParentId) {
      ref = { name: "ParentId", val: data.ParentId };
    } else if (data.CategoryId) {
      ref = { name: "CategoryId", val: data.CategoryId };
    }

    if (entry === "items") {
      setEditData({
        entry: entry,
        id: data.id,
        name: data.name,
        description: data.description,
        images: data.images,
        [ref.name]: ref.val,
        brand: data.brand,
        model: data.model,
        quantity: data.quantity,
        price: data.price,
      });
    } else {
      setEditData({
        entry: entry,
        id: data.id,
        name: data.name,
        description: data.description,
        image: data.image,
        [ref.name]: ref.val,
      });
    }
    showEditModal(true);
  };

  const closeEditModal = () => {
    showEditModal(false);
  };

  const handleDelete = (entry, data) => {
    setDeleteData({ entry, data });
    showDeleteAlert(true);
  };

  const closeDeleteModal = () => {
    showDeleteAlert(false);
  };

  return (
    <DataContext.Provider
      value={{ handleAdd, handleEdit, handleDelete, data, url }}
    >
      <div className="flex-flex-col w-full items-center justify-center relative bg-neutral-300 text-neutral-800 md:mt-6">
        <h1 className="text-xl font-mono font-thin mt-2 underline underline-offset-4 text-center">
          Category list
        </h1>
        <div className="md:mt-6 md:pb-5">
          <Suspense fallback={<h1>Loading...</h1>}>
            {/* <ListTable /> */}
            <MyTable />
          </Suspense>

          <div className="flex flex-col w-full justify-center items-center md:mt-3">
            <Button
              variant="contained"
              color="success"
              onClick={() => handleAdd("categories")}
              className="bg-green-700"
            >
              Add Category
            </Button>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <Add
        modal={addModal}
        closeAddModal={closeAddModal}
        addData={addData}
        setAddData={setAddData}
        create={create}
      />

      {/* Edit Modal */}
      <Edit
        modal={editModal}
        closeEditModal={closeEditModal}
        editData={editData}
        setEditData={setEditData}
        update={update}
      />

      {/* Delete Alert */}
      <Delete
        deleteAlert={deleteAlert}
        closeDeleteModal={closeDeleteModal}
        deleteData={deleteData}
        setDeleteData={setDeleteData}
        deleteItem={deleteItem}
      />
    </DataContext.Provider>
  );
}
export const useDataContext = () => useContext(DataContext);
