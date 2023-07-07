import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

import formatData from "@/app/utils/format";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ImagePreview from "./ImagePreview";

export default function Edit({
  modal,
  closeEditModal,
  update,
  editData,
  setEditData,
}) {
  const [imageSrc, setImageSrc] = useState();
  const [images, setImages] = useState([]);

  // Show image if any
  useEffect(() => {
    let img;

    if (editData.entry !== "items") {
      if (editData.image && editData.image !== "") {
        typeof editData.image !== "string"
          ? (img = editData.image.toString())
          : (img = editData.image);
        setImageSrc(img);
      } else {
        setImageSrc(null);
      }
    } else {
      if (editData.images !== []) {
        console.log(editData.images);
        let imgData = editData.images;
        let prevImg = [];
        imgData.map((img) => prevImg.push(img));
        setImages(prevImg);
      } else {
        console.log("Empty");
        setImages([]);
      }
    }
  }, [editData.image, editData.images, editData.entry]);

  const handleFileSelect = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = (onLoadEvent) => {
      setImageSrc(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
    setEditData({ ...editData, newImage: changeEvent.target.files[0] });
  };

  const handleMultipleSelect = (e) => {
    if (e.target.files) {
      const _files = Array.from(e.target.files);
      setImages(_files);
      setEditData({ ...editData, newImage: _files });
    }
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = formatData(editData);

    update(formData);

    closeEditModal();
    setImageSrc(null);
    setImages([]);
  };

  const handleClose = () => {
    closeEditModal();
    setImageSrc({});
    setEditData({});
  };

  let title;
  if (editData.id) {
    title = editData.id;
    title = title[0].toUpperCase() + title.slice(1);
  }
  return (
    <Modal
      open={modal}
      onClose={handleClose}
      aria-labelledby="Edit Modal"
      aria-describedby="Update"
      className="absolute top-20 w-[85%] md:w-2/5 h-screen my-6 md:mt-0 md:py-3 mx-auto overflow-y-auto no-scrollbar rounded-lg"
    >
      <Box className="">
        <div className="shadow bg-neutral-800 text-white rounded-2xl">
          <button
            name="close-modal"
            type="button"
            className="absolute top-10 right-5 md:top-5 text-white bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-hide="authentication-modal"
            onClick={handleClose}
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
          <div className="px-2 md:px-11 pb-12 lg:py-6">
            <h3 className="mb-4 py-4 text-xl text-center font-medium">
              <p className="mt-5">
                Update <em className="tracking-wider ">{title}</em>
              </p>
            </h3>
            <form
              onSubmit={handleSubmit}
              className="flex-1 flex flex-col justify-center items-center gap-12"
            >
              <div className="relative z-0 w-2/3 mb-6 group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={editData.name || ""}
                  onChange={handleChange}
                  required
                />

                <span className="text-red-500 absolute top-3 -left-5 ">*</span>
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Name
                </label>
              </div>
              <div className="relative z-0 w-2/3 mb-6 group">
                <input
                  id="newId"
                  name="newId"
                  type="text"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={
                    editData.newId !== undefined
                      ? editData.newId || ""
                      : editData.id || ""
                  }
                  onChange={handleChange}
                />
                <label
                  htmlFor="id"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  ShortName/URL
                </label>
              </div>
              {editData.entry === "items" && (
                <>
                  {/* Brand */}
                  <div className="relative z-0 w-2/3 mb-6 group">
                    <input
                      id="brand"
                      name="brand"
                      type="text"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={editData.brand || ""}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="brand"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Brand
                    </label>
                  </div>

                  {/* Model */}
                  <div className="relative z-0 w-2/3 mb-6 group">
                    <input
                      id="model"
                      name="model"
                      type="text"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={editData.model || ""}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="model"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Model
                    </label>
                  </div>

                  {/* Quantity */}
                  <div className="relative z-0 w-2/3 mb-6 group">
                    <input
                      id="quantity"
                      name="quantity"
                      type="number"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={editData.quantity || ""}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="id"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Quantity
                    </label>
                  </div>

                  {/* Price */}
                  <div className="relative z-0 w-2/3 mb-6 group">
                    <input
                      id="price"
                      name="price"
                      type="number"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={editData.price || ""}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="price"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Price
                    </label>
                  </div>
                </>
              )}
              <div className="relative z-0 w-2/3 mb-6 group">
                <textarea
                  cols={5}
                  rows={5}
                  id="description"
                  name="description"
                  type="text"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={editData.description || ""}
                  onChange={handleChange}
                />
                <label
                  htmlFor="description"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Description
                </label>
              </div>
              {editData.entry !== "items" ? (
                <>
                  <div className="relative z-0 w-2/3 mb-6 group">
                    <label
                      htmlFor="image"
                      className="text-md text-gray-500 dark:text-gray-400 top-6 -z-10"
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
                    <div className="relative h-56 w-56 mb-6">
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
                  <div className="relative z-0 w-2/3 mb-6 group">
                    <label
                      htmlFor="images"
                      className="text-md text-gray-500 dark:text-gray-400 top-6 -z-10"
                    >
                      Images
                    </label>
                    <input
                      id="images"
                      name="image"
                      type="file"
                      className="block py-2.5 px-0 w-full text-sm text-neutral-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      onChange={handleMultipleSelect}
                      multiple
                    />
                  </div>
                  {images && <ImagePreview images={images} />}
                </>
              )}

              <button
                name="submit"
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </Box>
    </Modal>
  );
}