"use client";

import { useState, createContext, useContext } from "react";
import Link from "next/link";

import Button from "@mui/material/Button";
import Add from "./Add";
import Edit from "./Edit";
// import DeleteModal from "./DeleteModal";
import LoadingIndicator from "@/app/utils/LoadingIndicator";
import ListTable from "./ListTable";

const DataContext = createContext({});

export default function List({ data, create, url }) {
  const [addModal, showAddModal] = useState(false);
  const [addData, setAddData] = useState({});

  const [editModal, showEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  const [deleteModal, showDeleteModal] = useState(false);
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

  const handleEdit = (entry, e) => {
    setEditData({ entry: entry, id: e.target.value });
    showEditModal(true);
  };

  const closeEditModal = () => {
    showEditModal(false);
  };

  const handleDelete = (entry, e) => {
    setDeleteData({ entry: "categories", id: e.target.value });
    showDeleteModal(true);
  };

  const closeDeleteModal = () => {
    showDeleteModal(false);
  };

  const categories = data[0];
  return (
    <DataContext.Provider
      value={{ handleAdd, handleEdit, handleDelete, data, url }}
    >
      <div className="flex flex-col w-full justify-center items-center bg-neutral-100 text-neutral-900 md:mt-6">
        <h1 className="text-lg underline underline-offset-2 shadow-inner shadow-black px-5 py-2 rounded-md md:mb-6">
          Admin Page
        </h1>
        <div className="flex-flex-col w-full items-center justify-center relative min-h-screen h-fit">
          <h1 className="text-lg italic underline underline-offset-4 text-center">
            List
          </h1>
          <div className="md:my-6 mb-6 md:pb-5 bg-white shadow-md shadow-black">
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
          create={create}
        />

        {/* Delete Alert */}
        {/* <DeleteModal
            handleCloseAlert={handleCloseAlert}
            deleteData={deleteData}
            setDeleteData={setDeleteData}
            alertDialog={alertDialog}
            mutate={mutate}
          /> */}
      </div>
    </DataContext.Provider>
  );
}
export const useDataContext = () => useContext(DataContext);
