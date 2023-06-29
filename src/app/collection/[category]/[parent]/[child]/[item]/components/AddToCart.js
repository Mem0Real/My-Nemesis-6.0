"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Add, Remove } from "@mui/icons-material";

export default function AddToCart({ modal, closeModal, item }) {
  const [order, setOrder] = useState();
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setOrder(quantity);
    // Add item to cart
    closeModal();
  };

  const handleMinus = () => {
    setQuantity(quantity - 1);
  };
  const handlePlus = () => {
    setQuantity(quantity + 1);
  };
  return (
    <Modal
      open={modal}
      onClose={closeModal}
      aria-labelledby="Order Modal"
      aria-describedby=""
      className="absolute top-1/2 w-1/4 h-screen my-6 md:mt-0 md:py-3 mx-auto overflow-y-scroll no-scrollbar rounded-lg"
    >
      <Box>
        <div className="shadow bg-neutral-800 text-white rounded-2xl py-6">
          <button
            name="close-modal"
            type="button"
            className="absolute top-10 right-5 md:top-5 text-white bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-hide="authentication-modal"
            onClick={() => closeModal()}
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
            <h3 className="mb-4 py-4 text-2xl text-center font-medium">
              <p className="mt-5">Add &quot;{item.name}&quot; to cart</p>
            </h3>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-4"
          >
            <div className="relative z-0 w-2/3 mb-6 group">
              <button onClick={handleMinus} type="button">
                <Remove />
              </button>
              <input
                type="number"
                name="amount"
                id="amount"
                className="block py-2.5 px-0 w-full text-sm text-neutral-900 bg-transparent border-0 border-b-2 border-neutral-300 appearance-none dark:text-white dark:border-neutral-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={quantity || ""}
                onChange={handleChange}
                required
                min={1}
                max={item.quantity}
                disabled
              />
              <button onClick={handlePlus} type="button">
                <Add />
              </button>

              <label
                htmlFor="amount"
                className="peer-focus:font-medium absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Quantity
              </label>
            </div>
            <button
              name="submit"
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to Cart
            </button>
          </form>
        </div>
      </Box>
    </Modal>
  );
}
