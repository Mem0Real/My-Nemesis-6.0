"use client";

import dynamic from "next/dynamic";
import { useState, createContext, useContext, useEffect } from "react";
import { Suspense } from "react";

import { motion, AnimatePresence } from "framer-motion";

const AddModal = dynamic(() => import("./Add"));
const EditModal = dynamic(() => import("./Edit"));
const DeleteModal = dynamic(() => import("./Delete"));

import ListTable from "./ListTable";

const DataContext = createContext({});

export default function List({ data, create, update, deleteItem, url }) {
  const [addModal, showAddModal] = useState(false);
  const [addData, setAddData] = useState({});

  const [editModal, showEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  const [deleteModal, showDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  useEffect(() => {
    if (addModal || editModal || deleteModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [addModal, editModal, deleteModal]);

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
    showDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteData({});
    showDeleteModal(false);
  };

  const variants = {
    open: {
      opacity: 1,
      display: "flex",
    },
    close: {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    },
  };
  return (
    <DataContext.Provider
      value={{ handleAdd, handleEdit, handleDelete, data, url }}
    >
      <div className="flex-flex-col w-full items-center justify-center relative bg-neutral-300 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 md:mt-6">
        <h1 className="text-xl font-mono font-thin mt-2 underline underline-offset-4 text-center">
          Category list
        </h1>
        <div className="md:mt-6 md:pb-5">
          <Suspense fallback={<h1>Loading...</h1>}>
            <ListTable />
          </Suspense>

          <div className="flex flex-col w-full justify-center items-center md:mt-3">
            <motion.button
              key="addCategory"
              className="px-3 py-2 rounded-md bg-green-900 text-neutral-800 dark:text-neutral-200"
              whileTap={{
                scale: 0.9,
              }}
              whileHover={{
                backgroundColor: "rgba(18 58 18 0.9)",
                borderRadius: "10px",
              }}
              onClick={() => handleAdd("categories")}
            >
              Add Category
            </motion.button>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <AnimatePresence className="my-3">
        {addModal && (
          <motion.div
            key="innerAddM"
            initial={"close"}
            animate={addModal ? "open" : "close"}
            variants={variants}
            exit={"close"}
            className={`fixed top-0 bottom-0 right-0 left-0 z-30 bg-white/70 dark:bg-black/70 backdrop-blur-sm  flex ${
              addModal ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <AddModal
              closeAddModal={closeAddModal}
              addData={addData}
              setAddData={setAddData}
              create={create}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence className="my-3">
        {editModal && (
          <motion.div
            key="innerEditM"
            initial={"close"}
            animate={editModal ? "open" : "close"}
            variants={variants}
            exit={"close"}
            className={`fixed top-0 bottom-0 right-0 left-0 z-30 bg-white/70 dark:bg-black/70 backdrop-blur-sm flex ${
              editModal ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <EditModal
              closeEditModal={closeEditModal}
              editData={editData}
              setEditData={setEditData}
              update={update}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Alert */}
      <AnimatePresence className="my-3">
        {deleteModal && (
          <motion.div
            key="innerDeleteM"
            initial={"close"}
            animate={deleteModal ? "open" : "close"}
            variants={variants}
            exit={"close"}
            className={`fixed top-0 bottom-0 right-0 left-0 z-30 bg-white/70 dark:bg-black/70 backdrop-blur-sm flex ${
              deleteModal ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <DeleteModal
              closeDeleteModal={closeDeleteModal}
              deleteData={deleteData}
              deleteItem={deleteItem}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </DataContext.Provider>
  );
}
export const useDataContext = () => useContext(DataContext);
