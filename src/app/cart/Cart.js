"use client";

import { useEffect, useState } from "react";
import { useCartContext } from "@/context/context";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export default function Cart({ closeCart, modal }) {
  //   const [data, setData] = useState();
  //   const [amount, setAmount] = useState();

  const { cartData, setCartData } = useCartContext();

  console.log(cartData);
  //   useEffect(() => {
  //     if (cartData) {
  //       if (!data && !amount) {
  //         setData(cartData.data);
  //         setAmount(cartData.quantity);
  //       } else {
  //         setData(...data, cartData.data);
  //         setAmount(...amount, cartData.quantity);
  //       }
  //       console.log(cartData);
  //     }
  //   }, [cartData]);

  return (
    <Modal
      open={modal}
      onClose={closeCart}
      aria-labelledby="Cart Modal"
      aria-describedby=""
      className="bg-neutral-900/20 backdrop-blur-sm"
    >
      <Box>
        <div className="shadow bg-neutral-800 text-neutral-200 rounded-2xl py-6 absolute w-1/3 right-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button
            name="close-modal"
            type="button"
            className="absolute top-10 right-5 md:top-5 text-neutral-200 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-hide="authentication-modal"
            onClick={closeCart}
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
          <div className="min-h-48 flex flex-col items-center gap-12">
            <h1 className="text-xl text-center font-black">Cart</h1>
            <div className="border border-1 border-neutral-200 rounded w-[95%]">
              {cartData[0] && cartData[0].data ? (
                <div className="flex flex-col items-start md:ms-4">
                  {cartData.map((cartItem) => {
                    console.log(cartItem);
                    return (
                      <div
                        key={cartItem.data.id}
                        className="px-5 outline outline-2 flex items-center gap-5"
                      >
                        <h1 className="text-lg font-semibold">
                          {cartItem.data.name}
                        </h1>
                        <div className="text-base italic">
                          {cartItem.quantity}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col-items-center justify-center">
                  <h1 className="text-md font-light">Empty</h1>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button>Confirm</button>
            <button onClick={() => setCartData([])}>Clear</button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
