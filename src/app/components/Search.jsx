import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export default function Search({ modal, closeSearch, data }) {
  return (
    <Modal
      open={modal}
      onClose={closeSearch}
      aria-labelledby="Add Modal"
      aria-describedby="Create a new category"
      className="absolute top-20 w-3/5 py-6 md:mt-0 md:w-1/3 md:h-fit md:py-3 mx-auto overflow-y-auto"
    >
      <Box className="">
        <div className="bg-white text-neutral-900 shadow dark:bg-neutral-800 dark:text-white">
          <button
            type="button"
            className="absolute top-6 right-2 md:top-5 md:right-5 text-black bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-neutral-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
            onClick={() => closeSearch()}
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
              <p className="mt-5">Create New Category</p>
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

                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  <span className="text-red-500 md:-ml-4 md:mr-2">*</span>
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
              <div className="relative z-0 w-2/3 mb-6 group">
                <label
                  htmlFor="image"
                  className="text-md text-neutral-500 dark:text-neutral-400 top-6 -z-10"
                >
                  Image
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  className="block py-2.5 px-0 w-full text-sm text-neutral-700 bg-transparent border-0 border-b-2 border-neutral-300 appearance-none dark:text-white dark:border-neutral-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleFileSelect}
                  ref={imageRef}
                />
              </div>
              {imageSrc && (
                <div className="relative h-56 w-56 mb-6">
                  <Image
                    src={imageSrc}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt="Image"
                    className="object-contain"
                  />
                </div>
              )}
              <button
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