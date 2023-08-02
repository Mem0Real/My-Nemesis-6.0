import React, { useState, useEffect } from "react";

import { useProductContext } from "@/context/ProductContext";
import { useIcons } from "../utils/CustomIcons";

import { setCookie, parseCookies } from "nookies";

import { motion } from "framer-motion";

export default function AddToCartModal({
  item,
  addToCartModal,
  closeAddToCartModal,
  addToCartRef,
}) {
  const [newCart, setNewCart] = useState(false);
  const [amount, setAmount] = useState();
  const [remainingQuantity, setRemainingQuantity] = useState();

  const cookieStore = parseCookies();

  const { storeProduct, addCartData, updater, setUpdater } =
    useProductContext();

  const { PlusIcon, MinusIcon } = useIcons();

  // Set initial quantity to 1
  useEffect(() => {
    if (addToCartModal === true) {
      let cart;
      if (cookieStore.Cart && cookieStore.Cart !== undefined)
        cart = JSON.parse(cookieStore.Cart);

      if (cart?.length > 0) {
        cart.map((product) => {
          if (product.id === item.id) {
            setAmount(parseInt(product.amount));
          } else {
            setAmount(() => 1);
          }
        });
      } else {
        setAmount(() => 1);
      }
    }
  }, [updater, item.id, addToCartModal]);

  // Store remaining quantity
  useEffect(() => {
    if (amount >= 0) {
      let remaining = item.quantity - amount;
      setRemainingQuantity(remaining);
    } else {
      let remaining = item.quantity;
      setRemainingQuantity(remaining);
    }
  }, [amount, item.quantity]);

  useEffect(() => {
    let cart;
    if (cookieStore.Cart && cookieStore.Cart !== undefined)
      cart = JSON.parse(cookieStore.Cart);

    if (cart?.length > 0) {
      setNewCart(() => true);
    } else {
      setNewCart(() => false);
    }
  }, [updater]);

  useEffect(() => {
    setCookie(null, "Cart_State", JSON.stringify(newCart));
  }, [newCart]);

  const handleChange = (e) => {
    if (e.target.value > 0) {
      setAmount(() => e.target.value);
    }
  };

  const handleMinus = () => {
    setAmount((prev) => --prev);
  };
  const handlePlus = () => {
    setAmount((prev) => ++prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    storeProduct(item.id, remainingQuantity);
    addCartData(item.id, item.name, item.quantity, amount, item.price);
    setNewCart(() => true);
    // setCookie(null, "Cart_State", JSON.stringify(true));
    setUpdater((prev) => !prev);
    closeAddToCartModal();
  };

  return (
    <section
      className="my-auto w-[90%] sm:w-[75%] md:w-[40%] lg:w-[30%] mx-auto overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-900"
      ref={addToCartRef}
    >
      <header className="pb-4 relative">
        <button
          name="close-adt-modal"
          type="button"
          className="absolute top-3 md:top-3 right-3 text-neutral-800 dark:text-neutral-200 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          data-modal-hide="authentication-modal"
          onClick={() => closeAddToCartModal()}
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
        <h3 className="mb-4 border-b border-neutral-800 dark:border-neutral-200 py-4 text-xl text-center font-medium text-neutral-800 dark:text-neutral-200">
          <p className="mt-5">{item.name}</p>
        </h3>
      </header>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <h1 className="text-base italic">Quantity</h1>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleMinus}
            type="button"
            disabled={amount === 1}
            className="text-neutral-800 dark:text-neutral-200 disabled:text-neutral-400 disabled:dark:text-neutral-600 disabled:hover:cursor-not-allowed flex flex-col items-center w-full h-full"
          >
            {MinusIcon}
          </button>
          <input
            type="number"
            name="amount"
            id="amount"
            className="text-center content-center py-2 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-800 dark:border-neutral-200"
            value={amount || ""}
            onChange={handleChange}
            required
            min={1}
            max={item.quantity}
          />
          <button
            onClick={handlePlus}
            type="button"
            disabled={amount === item.quantity}
            className="text-neutral-800 dark:text-neutral-200 disabled:text-neutral-400 disabled:dark:text-neutral-600 disabled:hover:cursor-not-allowed flex flex-col items-center w-full h-full"
          >
            {PlusIcon}
          </button>
        </div>
        <div className="py-5 flex flex-col justify-center items-center gap-5">
          <div className="flex gap-4 items-center md:self-center">
            <h1 className="m-auto">Product Remaining: </h1>
            <p className="font-semibold">{remainingQuantity}</p>
          </div>
          <div className="flex gap-4 items-center md:self-center">
            <h1 className="m-auto">Total Price: </h1>
            <p className="font-semibold">{item.price * amount} ETB</p>
          </div>
        </div>
        <motion.button
          key="submitToCart"
          whileTap={{
            scale: 0.9,
          }}
          whileHover={{
            borderRadius: "12px",
          }}
          className="px-3 py-2 rounded-lg outline outline-1 mb-4"
        >
          Submit
        </motion.button>
      </form>
    </section>
  );
}
