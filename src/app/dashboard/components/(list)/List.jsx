"use client";

import dynamic from "next/dynamic";
import { useState, createContext, useContext, useEffect, useRef } from "react";
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

	const addRef = useRef();
	const editRef = useRef();
	const deleteRef = useRef();

	// Disable scrollbar on modal open
	useEffect(() => {
		const handleWindowWheel = (event) => {
			if (addModal && !addRef?.current.contains(event.target)) {
				event.preventDefault();
			}
			if (editModal && !editRef?.current.contains(event.target)) {
				event.preventDefault();
			}
			if (deleteModal) event.preventDefault();
		};

		window.addEventListener("wheel", handleWindowWheel, { passive: false });

		return () => {
			window.removeEventListener("wheel", handleWindowWheel);
		};
	}, [addModal, editModal, deleteModal]);

	// Disable lenis scroll on modal open
	useEffect(() => {
		const html = document.querySelector("html");
		addModal || editModal || deleteModal
			? (html.dataset.lenisPrevent = "")
			: delete html.dataset.lenisPrevent;
	}, [addModal, editModal, deleteModal]);

	// Close modal on click outside
	useEffect(() => {
		let handler = (e) => {
			if (addModal && !addRef.current.contains(e.target)) {
				closeAddModal();
			}
			if (editModal && !editRef.current.contains(e.target)) {
				closeEditModal();
			}
			if (deleteModal && !deleteRef.current.contains(e.target)) {
				closeDeleteModal();
			}
		};

		document.addEventListener("mousedown", handler);

		return () => document.removeEventListener("mousedown", handler);
	}, [addModal, editModal, deleteModal]);

	// Close modals using keyboard shortcut "Esc"
	useEffect(() => {
		const esc = (e) => e.key === "Escape";

		const handler = (e) => {
			if (esc(e)) {
				closeAddModal();
				closeEditModal();
				closeDeleteModal();
			}
		};

		window.addEventListener("keyup", handler);

		return () => {
			window.removeEventListener("keyup", handler);
		};
	}, []);

	const handleAdd = (
		entry,
		categoryId = null,
		parentId = null,
		childId = null
	) => {
		!categoryId && !parentId && !childId && setAddData({ entry: entry });
		categoryId && setAddData({ entry: entry, categories: categoryId });
		categoryId &&
			parentId &&
			setAddData({ entry: entry, categories: categoryId, parents: parentId });
		categoryId &&
			parentId &&
			childId &&
			setAddData({
				entry: entry,
				categories: categoryId,
				parents: parentId,
				children: childId,
			});
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
			value={{
				handleAdd,
				handleEdit,
				handleDelete,
				data,
				url,
				addRef,
				editRef,
				deleteRef,
			}}
		>
			<div className="flex-flex-col w-full items-center justify-center relative bg-transparent text-neutral-800 dark:text-neutral-200 md:mt-6">
				<h1 className="text-xl font-mono font-thin mt-2 underline underline-offset-4 text-center">
					Category list
				</h1>
				<div className="md:mt-6 md:pb-5">
					<ListTable />

					<div className="flex flex-col w-full justify-center items-center mt-5">
						<motion.button
							key="addCategory"
							className="px-2 py-1 rounded-md  bg-transparent text-neutral-800 dark:text-neutral-200 outline outline-1 outline-green-600 dark:outline-green-500"
							whileTap={{
								scale: 0.9,
							}}
							whileHover={{
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
						className={`fixed top-0 bottom-0 right-0 left-0 z-40 bg-white/20 dark:bg-black/20 backdrop-blur-sm flex ${
							addModal ? "pointer-events-auto" : "pointer-events-none"
						}`}
					>
						<AddModal
							closeAddModal={closeAddModal}
							addData={addData}
							setAddData={setAddData}
							create={create}
							addModal={addModal}
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
						className={`fixed top-0 bottom-0 right-0 left-0 z-40 bg-white/20 dark:bg-black/20 backdrop-blur-sm flex ${
							editModal ? "pointer-events-auto" : "pointer-events-none"
						}`}
					>
						<EditModal
							closeEditModal={closeEditModal}
							editData={editData}
							setEditData={setEditData}
							update={update}
							editModal={editModal}
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
						className={`fixed top-0 bottom-0 right-0 left-0 z-40 bg-white/20 dark:bg-black/20 backdrop-blur-sm flex ${
							deleteModal ? "pointer-events-auto" : "pointer-events-none"
						}`}
					>
						<DeleteModal
							closeDeleteModal={closeDeleteModal}
							deleteData={deleteData}
							deleteItem={deleteItem}
							deleteModal={deleteModal}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</DataContext.Provider>
	);
}
export const useDataContext = () => useContext(DataContext);
