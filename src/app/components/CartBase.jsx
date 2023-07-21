"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import dynamic from "next/dynamic";

const CartModal = dynamic(() => import("../cart/CartCustom"));

import { useProductContext } from "@/context/productContext";
import { setCookie, parseCookies } from "nookies";

import { motion, AnimatePresence } from "framer-motion";

const CartContext = createContext({});

export default function CartBase({ children }) {
  const [cartModal, showCartModal] = useState(false);
  const { updater, setUpdater } = useProductContext();

  useEffect(() => {
    if (cartModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [cartModal]);

  const openCartModal = () => {
    showCartModal(() => true);
  };

  const closeCartModal = () => {
    showCartModal(() => false);
    setUpdater((prev) => !prev);
  };

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
    <CartContext.Provider value={{ cartModal, openCartModal }}>
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
      </AnimatePresence>
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);
