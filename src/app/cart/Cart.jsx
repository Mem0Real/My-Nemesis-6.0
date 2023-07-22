"use client";
import React, { useEffect, useRef } from "react";

import { useProductContext } from "@/context/productContext";
import { useCartContext } from "./CartBase";

import { motion } from "framer-motion";
import { useIcons } from "../utils/CustomIcons";

export default function Cart({ closeCartModal }) {
  const {
    subtractQuantity,
    addQuantity,
    changeQuantity,
    removeItem,
    updater,
    setUpdater,
  } = useProductContext();

  const {
    handleOrder,
    cartList,
    clearCart,
    TAX_RATE,
    ccyFormat,
    invoiceSubtotal,
    invoiceTaxes,
    invoiceTotal,
  } = useCartContext();

  const { PlusIcon, MinusIcon, DeleteIcon } = useIcons();

  const modalRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!modalRef.current.contains(e.target)) {
        closeCartModal();
      }
    };
    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMinus = (id) => {
    subtractQuantity(id);
    setUpdater((prev) => !prev);
  };

  const handlePlus = (id) => {
    addQuantity(id);
    setUpdater((prev) => !prev);
  };

  const handleChange = (id, e) => {
    changeQuantity(id, e.target.value);
    setUpdater((prev) => !prev);
  };

  const handleRemove = (id) => {
    removeItem(id);
    setUpdater((prev) => !prev);
  };

  return (
    <section
      className="h-fit my-auto w-[90%] sm:w-[75%] md:w-[60%] lg:w-[60%] mx-auto overflow-y-scroll no-scrollbar rounded-lg bg-neutral-900"
      ref={modalRef}
    >
      <header className="pb-4 relative">
        <button
          name="close-cart-modal"
          type="button"
          className="absolute top-2 right-5 text-white bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          data-modal-hide="authentication-modal"
          onClick={() => closeCartModal()}
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
        <h3 className="mb-4 py-5 border-b border-neutral-200 text-xl text-center font-medium text-neutral-200">
          Cart
        </h3>
        <h1 className="py-1 ps-5 self-start text-lg px-2 underline underline-offset-2">
          List of Items
        </h1>
      </header>
      <main className="pb-5">
        <table className="table-fixed shadow-inner w-[95%] mx-auto bg-neutral-900 shadow-white/60 rounded rounded-b-2xl border-collapse">
          <thead>
            <tr className="border-b border-1 border-neutral-200">
              <th className="text-center py-2 ps-2 w-36 md:w-40 lg:w-36">
                Product
              </th>
              <th className="text-center py-2 w-24 md:w-24 lg:w-24">
                Quantity
              </th>
              <th className="text-center py-2  w-24 md:w-24 lg:w-24">Price</th>
              <th className="w-8 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {cartList?.length > 0 ? (
              <>
                {cartList.map((item) => (
                  <tr key={item.id} className="border-b border-neutral-200">
                    <td className="text-center py-3 ps-2">{item.name}</td>
                    <td className="text-center py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleMinus(item.id)}
                          type="button"
                          disabled={item.amount <= 1}
                          className="disabled:text-neutral-600 disabled:hover:cursor-not-allowed "
                        >
                          {MinusIcon}
                        </button>
                        <input
                          type="number"
                          name="quantity"
                          id="quantity"
                          className="text-center content-center py-2 rounded-lg bg-neutral-800 text-neutral-200 border border-neutral-200"
                          value={item.amount || ""}
                          onChange={(e) => handleChange(item.id, e)}
                          required
                          min={1}
                          max={item.quantity}
                        />
                        <button
                          onClick={() => handlePlus(item.id)}
                          type="button"
                          disabled={item.amount === item.quantity}
                          className="disabled:text-neutral-600 disabled:hover:cursor-not-allowed"
                        >
                          {PlusIcon}
                        </button>
                      </div>
                    </td>
                    <td className="text-center py-3 pe-2">
                      {item.totalPrice}
                      <span className="text-sm px-1 text-neutral-600 italic items-center">
                        ETB
                      </span>
                    </td>
                    <td align="center" className="text-center">
                      <button
                        className="flex flex-col items-center justify-center self-center h-full"
                        onClick={() => handleRemove(item.id)}
                      >
                        {DeleteIcon}
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td rowSpan={3} />
                  <td className="text-center py-2">SubTotal</td>
                  <td className="text-center">
                    {ccyFormat(invoiceSubtotal)}
                    <span className="text-sm px-1 text-neutral-600 italic items-center">
                      ETB
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <p>Tax</p>
                      <span className="font-thin italic text-sm">
                        ({`${(TAX_RATE * 100).toFixed(0)} %`})
                      </span>
                    </div>
                  </td>
                  <td className="text-center py-2">
                    {ccyFormat(invoiceTaxes)}
                    <span className="text-sm px-1 text-neutral-600 italic items-center">
                      ETB
                    </span>
                  </td>
                </tr>
                <tr className="border-t border-neutral-200">
                  <td className="text-center py-4">Total</td>
                  <td className="text-center py-4">
                    {ccyFormat(invoiceTotal)}
                    <span className="text-sm px-1 text-neutral-600 italic items-center">
                      ETB
                    </span>
                  </td>
                </tr>
              </>
            ) : (
              <tr rowSpan={4}>
                <td colSpan={5} rowSpan={4} className="py-20">
                  <h1 className="text-center text-lg mx-auto font-semibold">
                    Cart Empty
                  </h1>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
      <footer className="flex items-center justify-center gap-12 w-full text-base">
        {cartList?.length > 0 && (
          <>
            <motion.button
              key="contactInfo"
              whileTap={{
                scale: 0.9,
              }}
              whileHover={{
                borderRadius: "12px",
              }}
              className="px-4 py-2 rounded-lg outline outline-1 outline-green-700 mb-4"
              onClick={handleOrder}
            >
              Order
            </motion.button>
            <motion.button
              key="clearCart"
              whileTap={{
                scale: 0.9,
              }}
              whileHover={{
                borderRadius: "12px",
              }}
              className="px-4 py-2 rounded-lg outline outline-1 outline-red-600 mb-4"
              onClick={() => clearCart()}
            >
              Clear
            </motion.button>
          </>
        )}
      </footer>
    </section>
  );
}
