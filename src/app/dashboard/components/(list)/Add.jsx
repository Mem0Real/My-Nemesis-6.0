import React, { useState, useRef } from "react";
import Image from "next/image";
import ImagePreview from "./ImagePreview";

import formatData from "@/app/utils/format";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { toast } from "react-hot-toast";

export default function Add({
  modal,
  closeAddModal,
  create,
  addData,
  setAddData,
}) {
  const [imageSrc, setImageSrc] = useState();
  const [images, setImages] = useState([]);

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

    console.log(addData);
    const formData = formatData(addData);

    const res = create(formData);
    toast
      .promise(
        res,
        {
          loading: "Loading...",
          success: () =>
            `Successfully created ${addData.name} inside ${
              addData.entry === "categories"
                ? addData.entry
                : addData.entry === "parents"
                ? addData.categories
                : addData.entry === "children"
                ? addData.parents
                : addData.entry === "items" && addData.children
            }`,
          error: (err) => `Error creating item: ${err.toString()}`,
        },
        {
          style: {
            minWidth: "250px",
          },
          success: {
            duration: 5000,
          },
        }
      )
      .then(() => {
        closeAddModal();
      })
      .then(() => {
        setImageSrc(null);
      })
      .then(() => {
        setImages([]);
      });
  };
  return (
    <Modal
      open={modal}
      onClose={closeAddModal}
      aria-labelledby="Add Modal"
      aria-describedby="Create a new category"
      className="absolute top-20 w-[85%] md:w-2/5 h-screen my-6 md:mt-0 md:py-3 mx-auto overflow-y-scroll no-scrollbar rounded-lg"
    >
      <Box className="">
        <div className="shadow bg-neutral-800 text-white rounded-2xl">
          <button
            name="close-modal"
            type="button"
            className="absolute top-10 right-5 md:top-5 text-white bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
          <div className="px-2 md:px-11 pb-12 lg:py-6">
            <h3 className="mb-4 py-4 text-xl text-center font-medium">
              {addData.entry === "categories" && (
                <p className="mt-5">Create New Category</p>
              )}
              {addData.entry === "parents" && (
                <p className="mt-5">
                  Create New Parent Inside <br /> {addData.categories}
                </p>
              )}
              {addData.entry === "children" && (
                <p className="mt-5">
                  Create New Child Inside <br /> {addData.parents}
                </p>
              )}
              {addData.entry === "items" && (
                <p className="mt-5">
                  Create New Item Inside <br /> {addData.children}
                </p>
              )}
            </h3>
            <form
              onSubmit={handleSubmit}
              className="flex-1 flex flex-col justify-center items-center gap-4"
            >
              <div className="relative z-0 w-2/3 mb-6 group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block py-2.5 px-0 w-full text-sm text-neutral-900 bg-transparent border-0 border-b-2 border-neutral-300 appearance-none dark:text-white dark:border-neutral-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={addData.name || ""}
                  onChange={handleChange}
                  required
                />

                <span className="text-red-500 absolute top-3 -left-5 ">*</span>
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Name
                </label>
              </div>
              <div className="relative z-0 w-2/3 mb-6 group">
                <input
                  id="id"
                  name="id"
                  type="text"
                  className="block py-2.5 px-0 w-full text-sm text-neutral-900 bg-transparent border-0 border-b-2 border-neutral-300 appearance-none dark:text-white dark:border-neutral-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={addData.id || ""}
                  onChange={handleChange}
                />
                <label
                  htmlFor="id"
                  className="peer-focus:font-medium absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  ShortName/URL
                </label>
              </div>
              {addData.entry === "items" && (
                <>
                  {/* Brand */}
                  <div className="relative z-0 w-2/3 mb-6 group">
                    <input
                      id="brand"
                      name="brand"
                      type="text"
                      className="block py-2.5 px-0 w-full text-sm text-neutral-900 bg-transparent border-0 border-b-2 border-neutral-300 appearance-none dark:text-white dark:border-neutral-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={addData.brand || ""}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="brand"
                      className="peer-focus:font-medium absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                      className="block py-2.5 px-0 w-full text-sm text-neutral-900 bg-transparent border-0 border-b-2 border-neutral-300 appearance-none dark:text-white dark:border-neutral-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={addData.model || ""}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="model"
                      className="peer-focus:font-medium absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                      className="block py-2.5 px-0 w-full text-sm text-neutral-900 bg-transparent border-0 border-b-2 border-neutral-300 appearance-none dark:text-white dark:border-neutral-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={addData.quantity || ""}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="id"
                      className="peer-focus:font-medium absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                      className="block py-2.5 px-0 w-full text-sm text-neutral-900 bg-transparent border-0 border-b-2 border-neutral-300 appearance-none dark:text-white dark:border-neutral-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={addData.price || ""}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="price"
                      className="peer-focus:font-medium absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                  className="block py-2.5 px-0 w-full text-sm text-neutral-900 bg-transparent border-0 border-b-2 border-neutral-300 appearance-none dark:text-white dark:border-neutral-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={addData.description || ""}
                  onChange={handleChange}
                />
                <label
                  htmlFor="description"
                  className="peer-focus:font-medium absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Description
                </label>
              </div>
              {addData.entry !== "items" ? (
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
