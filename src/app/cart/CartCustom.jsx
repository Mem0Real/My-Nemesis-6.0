"use client";
import React, { useState, useEffect, useRef } from "react";
import ContactInfo from "./ContactInfo";
import { Add, Remove, Clear } from "@mui/icons-material";
import { useProductContext } from "@/context/productContext";
import { toast } from "react-hot-toast";

import { setCookie, parseCookies } from "nookies";
export default function CartCustom({ closeCartModal }) {
  const [data, setData] = useState(false);
  const [infoModal, showInfoModal] = useState(false);
  const [cartList, setCartList] = useState();

  const {
    subtractQuantity,
    addQuantity,
    changeQuantity,
    removeItem,
    updater,
    setUpdater,
  } = useProductContext();

  const modalRef = useRef();
  const cookieStore = parseCookies();

  useEffect(() => {
    let handler = (e) => {
      if (!modalRef.current.contains(e.target)) {
        closeCartModal();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    let cart;
    if (cookieStore.Cart && cookieStore?.Cart !== undefined)
      cart = JSON.parse(cookieStore.Cart);

    if (cart?.length > 0) {
      setData(() => true);
      setCartList(() => cart);
    } else {
      setData(() => false);
    }
  }, [updater]);

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

  const clearCart = () => {
    setCookie(null, "Cart", JSON.stringify([]));
    setCookie(null, "Product", JSON.stringify([]));
    setCookie(null, "Cart_State", false);

    // setUpdater((prev) => !prev);
    setCartList(() => []);
    setData(() => false);

    toast("Cart cleared!");
    setTimeout(() => {
      closeCartModal();
    }, 100);
  };

  const handleOrder = () => {
    closeCartModal();
    showInfoModal(() => true);
  };

  const closeInfoModal = () => {
    showInfoModal(() => false);
  };

  const TAX_RATE = 0.07;

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function subtotal() {
    if (cartList?.length > 0) {
      let allPrice = cartList.map((items) => {
        return parseFloat(items.totalPrice);
      });
      allPrice = allPrice.reduce((sum, i) => sum + i, 0);
      return allPrice;
    }
  }

  const invoiceSubtotal = subtotal();
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

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
        <table className="shadow-inner w-auto md:w-[95%] mx-auto bg-neutral-900 shadow-black/60 rounded rounded-b-2xl border-collapse">
          <thead>
            <tr className="border-b border-1 border-neutral-200">
              <th className="text-left py-4 ps-2">Product</th>
              <th className="text-center py-4 ps-2">Quantity</th>
              <th className="text-right py-4 pe-2" colSpan={2} align="right">
                Price
              </th>
              <th className="py-3"></th>
            </tr>
          </thead>
          <tbody>
            {data == true ? (
              <>
                {cartList.map((item) => (
                  <tr key={item.id} className="border-b border-neutral-200">
                    <td className="py-3 ps-2">{item.name}</td>
                    <td className="text-center py-3 ps-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleMinus(item.id)}
                          type="button"
                          disabled={item.amount <= 1}
                          className="disabled:text-neutral-600 disabled:hover:cursor-not-allowed "
                        >
                          <Remove />
                        </button>
                        <input
                          type="number"
                          name="quantity"
                          id="quantity"
                          className="text-center pl-2.5 py-2 rounded-xl bg-neutral-800 text-neutral-200 border border-neutral-200"
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
                          <Add />
                        </button>
                      </div>
                    </td>
                    <td className="text-right py-3 pe-2" colSpan={2}>
                      {item.totalPrice}
                      <span className="text-sm px-1 text-neutral-600 italic items-center">
                        ETB
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleRemove(item.id, item.quantity)}
                      >
                        <Clear color="error" />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td rowSpan={3} />
                  <td colSpan={2} className="py-2">
                    SubTotal
                  </td>
                  <td align="right">
                    {ccyFormat(invoiceSubtotal)}
                    <span className="text-sm px-1 text-neutral-600 italic items-center">
                      ETB
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td align="right" className="py-2">{`${(
                    TAX_RATE * 100
                  ).toFixed(0)} %`}</td>
                  <td align="right">
                    {ccyFormat(invoiceTaxes)}
                    <span className="text-sm px-1 text-neutral-600 italic items-center">
                      ETB
                    </span>
                  </td>
                </tr>
                <tr className="border-t border-neutral-200">
                  <td colSpan={2} className="py-4">
                    Total
                  </td>
                  <td align="right" className="py-4">
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
        {data && (
          <>
            <motion.button
              key="contactInfo"
              whileTap={{
                scale: 0.9,
              }}
              whileHover={{
                borderRadius: "12px",
              }}
              className="px-3 py-2 rounded-lg outline outline-1 outline-green-700 mb-4"
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
              className="px-3 py-2 rounded-lg outline outline-1 outline-red-600 mb-4"
              onClick={clearCart}
            >
              Clear
            </motion.button>
          </>
        )}
      </footer>
    </section>
  );
}
