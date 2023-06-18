"use client";

import { useState, createContext, useContext } from "react";
import Link from "next/link";

import Button from "@mui/material/Button";
import Add from "./Add";
import Edit from "./Edit";
import Delete from "./Delete";
import ListTable from "./ListTable";
import LoadingIndicator from "@/app/utils/LoadingIndicator";

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
    setEditData({
      entry: entry,
      id: data.id,
      name: data.name,
      description: data.description,
      image: data.image,
    });
    if (entry === "items") {
      setEditData((editData) => {
        return {
          ...editData,
          brand: data.brand,
          model: data.model,
          quantity: data.quantity,
          price: data.price,
        };
      });
    }
    showEditModal(true);
  };

  const closeEditModal = () => {
    showEditModal(false);
  };

  const handleDelete = (entry, id) => {
    setDeleteData({ entry, id });
    showDeleteAlert(true);
  };

  const closeDeleteModal = () => {
    showDeleteAlert(false);
  };

  return (
    <DataContext.Provider
      value={{ handleAdd, handleEdit, handleDelete, data, url }}
    >
      <div className="flex-flex-col w-full items-center justify-center relative min-h-screen h-fit bg-neutral-200 text-neutral-900 md:mt-6">
        <h1 className="text-lg italic underline underline-offset-4 text-center">
          List
        </h1>
        <div className="md:my-6 mb-6 md:pb-5 shadow-md shadow-black">
          <ListTable />

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
