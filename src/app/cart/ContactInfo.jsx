"use client";
import { useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export default function ContactInfo({
  orderData,
  orderTotalPrice,
  closeInfoModal,
  modal,
  clearCart,
}) {
  const [user, setUser] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("User Data: ", user);
    // console.log("Order Data: ", orderData);
    // console.log("Order Total Price: ", orderTotalPrice);

    let url;
    if (process.env.NODE_ENV === "development")
      url = process.env.NEXT_PUBLIC_LOCAL_URL;
    else if (process.env.NODE_ENV === "production")
      url = process.env.NEXT_PUBLIC_PRODUCTION_URL;

    let productData = [];

    let firstName = user.fullname;
    firstName = firstName.split(" ")[0];

    orderData.map((item) => {
      let id = item.data.id;
      let name = item.data.name;
      let qty = item.quantity;
      let price = item.data.price;

      productData.push({
        data: {
          id: id,
          name: name,
          quantity: qty,
          price: price,
          customerid: firstName,
        },
      });
    });

    console.log("FirstName: ", firstName);
    console.log("Product Data: ", productData);

    const res = await fetch(`${url}/api/sendOrder`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ user, productData, orderTotalPrice }),
    });

    if (!res.ok) {
      throw new Error(
        "Error sending order. Please check your network and try again."
      );
    }
    console.log("Order sent! One of our employees will reach out to you soon.");
    // clearCart();
    // setUser(() => {});
  };
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <Modal
      open={modal}
      onClose={closeInfoModal}
      aria-labelledby="Contact Info"
      aria-describedby="form to input user info"
      className="bg-neutral-900/20 backdrop-blur-sm"
    >
      <Box>
        <div className="shadow bg-neutral-800 text-neutral-200 rounded-2xl py-6 absolute w-[90%] sm:w-[80%] md:w-[70%] lg:w-1/2 right-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button
            name="close-modal"
            type="button"
            className="absolute top-1 right-1 md:top-3 text-neutral-200 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-hide="authentication-modal"
            onClick={closeInfoModal}
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
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-lg md:text-xl xl:text-2xl text-center font-semibold border-b border-neutral-200 w-full pb-3">
              Your order is processed
            </h1>
            <h1 className="py-1 text-xl px-2 underline underline-offset-2 text-center">
              Please enter your information below
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex-1 flex flex-col justify-center items-center gap-4 w-[90%]"
            >
              <div className=" border p-5 rounded-md shadow-inner shadow-neutral-500 w-[75%]">
                <div className="relative z-0 mb-6 group">
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm text-neutral-900 bg-transparent border-0 border-b-2 border-neutral-300 appearance-none dark:text-white dark:border-neutral-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={user.fullname || ""}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="fullname"
                    className="peer-focus:font-medium absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Full Name
                  </label>
                </div>

                <div className="relative z-0 mb-6 group flex flex-row-reverse items-center border-0 border-b-2 border-neutral-600 gap-2 ">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="block py-2.5 px-0 w-full text-sm text-neutral-900 bg-transparent appearance-none dark:text-white dark:border-neutral-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    value={user.phone || ""}
                    placeholder=" "
                    onChange={handleChange}
                  />
                  <p className="text-sm text-neutral-500 peer-focus:opacity-100 peer-placeholder-shown:opacity-0 bg-transparent py-2 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 transition-opacity ease-in duration-100">
                    +251
                  </p>
                  <label
                    htmlFor="phone"
                    className="peer-focus:font-medium absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500  peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Phone Number
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-center gap-6 w-full">
                <>
                  <button
                    name="submit"
                    type="submit"
                    className="w-24 py-2 rounded outline outline-1 outline-green-600 hover:outline-2 active:outline-4 font-thin"
                  >
                    Confirm
                  </button>
                  <button
                    name="cancel"
                    onClick={closeInfoModal}
                    className="w-24 py-2 rounded outline outline-1 outline-red-600 hover:outline-2 active:outline-4 font-thin"
                  >
                    Cancel
                  </button>
                </>
              </div>
            </form>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
