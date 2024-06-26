import React, { useState } from "react";
import Image from "next/image";
import ImagePreview from "./ImagePreview";

import formatData from "@/app/utils/format";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useDataContext } from "./List";

export default function AddModal({
	closeAddModal,
	create,
	addData,
	setAddData,
	addModal,
}) {
	const [imageSrc, setImageSrc] = useState();
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(false);

	const { addRef } = useDataContext();

	const handleFileSelect = (changeEvent) => {
		const reader = new FileReader();

		reader.onload = (onLoadEvent) => {
			setImageSrc(onLoadEvent.target.result);
		};

		reader.readAsDataURL(changeEvent.target.files[0]);
		setAddData({ ...addData, image: changeEvent.target.files[0] });
	};

	const handleMultipleSelect = (e) => {
		if (e.target.files) {
			const _files = Array.from(e.target.files);
			setImages(_files);
			setAddData({ ...addData, image: _files });
		}
	};

	const handleChange = (e) => {
		setAddData({ ...addData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = formatData(addData);

		setLoading(() => true);
		const toastId = toast.loading(`Creating ${addData.name} ...`);

		const res = await create(formData);

		setLoading(() => false);
		toast.remove(toastId);
		if (res?.error) toast.error(res.error, { duration: 4000 });
		else {
			toast.success(res.success);
			closeAddModal();
			setImageSrc(() => null);
			setImages(() => []);
		}
	};

	const entrance = {
		open: { x: "0vw" },
		close: { x: "50vw" },
	};
	return (
		<motion.section
			ref={addRef}
			className="h-[95%] w-[90%] sm:w-[75%] md:w-[40%] lg:w-[30%] my-5 md:py-3 ml-auto overflow-y-scroll no-scrollbar rounded-lg bg-neutral-300 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200"
			animate={addModal ? "open" : "close"}
			initial="close"
			exit="close"
			variants={entrance}
		>
			<header className="pb-4 relative">
				<button
					name="close-add-modal"
					type="button"
					className="absolute top-3 md:top-0 right-5 text-neutral-800 dark:text-neutral-200 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
					data-modal-hide="authentication-modal"
					onClick={() => closeAddModal()}
				>
					<svg
						aria-hidden="true"
						className="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clipRule="evenodd"
						></path>
					</svg>
					<span className="sr-only">Close modal</span>
				</button>
				<h3 className="mb-4 border-b border-neutral-800 dark:border-neutral-200 py-4 text-xl text-center font-medium text-neutral-800 dark:text-neutral-200">
					{addData.entry === "categories" && (
						<p className="mt-5">Create New Category</p>
					)}
					{addData.entry === "parents" && (
						<p className="mt-5">
							Create New Parent Inside <br />
							<span className="capitalize">{addData.categories}</span>
						</p>
					)}
					{addData.entry === "children" && (
						<p className="mt-5">
							Create New Child Inside <br />
							<span className="capitalize">{addData.parents}</span>
						</p>
					)}
					{addData.entry === "items" && (
						<p className="mt-5">
							Create New Item Inside <br />
							<span className="capitalize">{addData.children}</span>
						</p>
					)}
				</h3>
			</header>
			<form
				onSubmit={handleSubmit}
				className="flex-1 flex flex-col justify-center items-center gap-4 py-3"
			>
				<div className="relative z-0 w-2/3 mb-9 group">
					<input
						type="text"
						name="name"
						id="name"
						className="block py-2.5 px-0 w-full text-sm text-neutral-800 dark:text-neutral-200 bg-transparent border-0 border-b-2 border-neutral-400 appearance-none dark:border-neutral-800 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						value={addData.name || ""}
						onChange={handleChange}
						required
						autoFocus
					/>

					<span className="text-red-500 absolute top-3 -left-5 ">*</span>
					<label
						htmlFor="name"
						className="peer-focus:font-medium absolute text-sm text-neutral-600 dark:text-neutral-400 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
					>
						Name
					</label>
				</div>
				<div className="relative z-0 w-2/3 mb-9 group">
					<input
						id="id"
						name="id"
						type="text"
						className="block py-2.5 px-0 w-full text-sm text-neutral-800 dark:text-neutral-200 bg-transparent border-0 border-b-2 border-neutral-400 appearance-none dark:border-neutral-800 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						value={addData.id || ""}
						onChange={handleChange}
					/>
					<label
						htmlFor="id"
						className="peer-focus:font-medium absolute text-sm text-neutral-600 dark:text-neutral-400 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
					>
						ShortName/URL
					</label>
				</div>
				{addData.entry === "items" && (
					<>
						{/* Brand */}
						<div className="relative z-0 w-2/3 mb-9 group">
							<input
								id="brand"
								name="brand"
								type="text"
								className="block py-2.5 px-0 w-full text-sm text-neutral-800 dark:text-neutral-200  bg-transparent border-0 border-b-2 border-neutral-400 appearance-none dark:border-neutral-800 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								value={addData.brand || ""}
								onChange={handleChange}
							/>
							<label
								htmlFor="brand"
								className="peer-focus:font-medium absolute text-sm text-neutral-600 dark:text-neutral-400 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
							>
								Brand
							</label>
						</div>

						{/* Model */}
						<div className="relative z-0 w-2/3 mb-9 group">
							<input
								id="model"
								name="model"
								type="text"
								className="block py-2.5 px-0 w-full text-sm text-neutral-800 dark:text-neutral-200  bg-transparent border-0 border-b-2 border-neutral-400 appearance-none dark:border-neutral-800 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								value={addData.model || ""}
								onChange={handleChange}
							/>
							<label
								htmlFor="model"
								className="peer-focus:font-medium absolute text-sm text-neutral-600 dark:text-neutral-400 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
							>
								Model
							</label>
						</div>

						{/* Quantity */}
						<div className="relative z-0 w-2/3 mb-9 group">
							<input
								id="quantity"
								name="quantity"
								type="number"
								className="block py-2.5 px-0 w-full text-sm text-neutral-800 dark:text-neutral-200  bg-transparent border-0 border-b-2 border-neutral-400 appearance-none dark:border-neutral-800 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								value={addData.quantity || ""}
								onChange={handleChange}
							/>
							<label
								htmlFor="id"
								className="peer-focus:font-medium absolute text-sm text-neutral-600 dark:text-neutral-400 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
							>
								Quantity
							</label>
						</div>

						{/* Price */}
						<div className="relative z-0 w-2/3 mb-9 group">
							<input
								id="price"
								name="price"
								type="number"
								className="block py-2.5 px-0 w-full text-sm text-neutral-800 dark:text-neutral-200  bg-transparent border-0 border-b-2 border-neutral-400 appearance-none dark:border-neutral-800 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								value={addData.price || ""}
								onChange={handleChange}
							/>
							<label
								htmlFor="price"
								className="peer-focus:font-medium absolute text-sm text-neutral-600 dark:text-neutral-400 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
							>
								Price
							</label>
						</div>
					</>
				)}
				<div className="relative z-0 w-2/3 mb-9 group">
					<textarea
						cols={5}
						rows={5}
						id="description"
						name="description"
						type="text"
						className="block py-2.5 px-0 w-full text-sm text-neutral-800 dark:text-neutral-200  bg-transparent border-0 border-b-2 border-neutral-400 appearance-none dark:border-neutral-800 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						value={addData.description || ""}
						onChange={handleChange}
					/>
					<label
						htmlFor="description"
						className="peer-focus:font-medium absolute text-sm text-neutral-600 dark:text-neutral-400 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
					>
						Description
					</label>
				</div>
				{addData.entry !== "items" ? (
					<>
						<div className="relative z-0 w-2/3 mb-9 group">
							<label
								htmlFor="image"
								className="text-md text-neutral-600 dark:text-neutral-400 top-6 -z-10"
							>
								Image
							</label>
							<input
								id="image"
								name="image"
								type="file"
								className="block py-2.5 px-0 w-full text-sm text-neutral-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								onChange={handleFileSelect}
							/>
						</div>

						{imageSrc && (
							<div className="relative h-56 w-56 mb-9">
								<Image
									src={imageSrc}
									fill={true}
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
									alt="Image"
									className="object-contain rounded-lg"
								/>
							</div>
						)}
					</>
				) : (
					<>
						<div className="relative z-0 w-2/3 mb-9 group">
							<label
								htmlFor="images"
								className="text-md text-neutral-600 dark:text-neutral-400 top-6 -z-10"
							>
								Images
							</label>
							<input
								id="images"
								name="images"
								type="file"
								className="block py-2.5 px-0 w-full text-sm text-neutral-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								onChange={handleMultipleSelect}
								multiple
							/>
						</div>
						{images && <ImagePreview images={images} />}
					</>
				)}
				<motion.button
					disabled={loading}
					name="submit"
					type="submit"
					className="px-2 py-1 rounded-md bg-transparent text-neutral-800 dark:text-neutral-200 outline outline-1 outline-blue-600 dark:outline-blue-500"
					whileHover={{
						borderRadius: "10px",
					}}
					whileTap={{
						scale: 0.95,
					}}
				>
					Submit
				</motion.button>
			</form>
		</motion.section>
	);
}
