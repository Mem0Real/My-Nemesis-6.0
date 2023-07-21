"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import dynamic from "next/dynamic";

const CartModal = dynamic(() => import("./Cart"));
const ContactInfo = dynamic(() => import("./ContactInfo"));

import { useProductContext } from "@/context/productContext";
import { setCookie, parseCookies } from "nookies";

import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

const CartContext = createContext({});

export default function CartBase({ children }) {
  const [cartModal, showCartModal] = useState(false);
  const [infoModal, showInfoModal] = useState(false);
  const [newCart, setNewCart] = useState(false);

  const [cartList, setCartList] = useState();

  const { updater, setUpdater } = useProductContext();

  const cookieStore = parseCookies();

  useEffect(() => {
    if (cartModal || infoModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [cartModal, infoModal]);

  useEffect(() => {
    let cart;
    if (cookieStore.Cart && cookieStore?.Cart !== undefined)
      cart = JSON.parse(cookieStore.Cart);

    if (cart?.length > 0) {
      setCartList(() => cart);
      setNewCart(() => true);
      setCookie(null, "Cart_State", true);
    } else {
      setNewCart(() => false);
      setCookie(null, "Cart_State", false);
    }
  }, [updater]);

  const openCartModal = () => {
    showCartModal(() => true);
  };

  const closeCartModal = () => {
    showCartModal(() => false);
    setUpdater((prev) => !prev);
  };

  const handleOrder = () => {
    closeCartModal();
    showInfoModal(() => true);
  };

  const closeInfoModal = () => {
    showInfoModal(() => false);
  };

  const clearCart = () => {
    setCookie(null, "Cart", JSON.stringify([]));
    setCookie(null, "Product", JSON.stringify([]));
    setCookie(null, "Cart_State", false);

    // setUpdater((prev) => !prev);
    setCartList(() => []);
    // setData(() => false);

    toast("Cart cleared!");
    setTimeout(() => {
      closeCartModal();
    }, 100);
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
    <CartContext.Provider
      value={{
        newCart,
        cartModal,
        openCartModal,
        infoModal,
        handleOrder,
        cartList,
        clearCart,
        TAX_RATE,
        ccyFormat,
        invoiceSubtotal,
        invoiceTaxes,
        invoiceTotal,
      }}
    >
      {children}
      <AnimatePresence className="my-3">
        {cartModal && (
          <motion.div
            key="innerCartM"
            initial={"close"}
            animate={cartModal ? "open" : "close"}
            variants={variants}
            exit={"close"}
            className={`fixed top-0 bottom-0 right-0 left-0 z-10 bg-black/50 backdrop-blur-sm  flex ${
              cartModal ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <CartModal closeCartModal={closeCartModal} />
          </motion.div>
        )}
        {infoModal && (
          <motion.div
            key="innerAddM"
            initial={"close"}
            animate={infoModal ? "open" : "close"}
            variants={variants}
            exit={"close"}
            className={`fixed top-0 bottom-0 right-0 left-0 z-10 bg-black/50 backdrop-blur-sm  flex ${
              infoModal ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <ContactInfo
              cartList={cartList}
              orderTotalPrice={invoiceTotal}
              clearCart={clearCart}
              closeInfoModal={closeInfoModal}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);
