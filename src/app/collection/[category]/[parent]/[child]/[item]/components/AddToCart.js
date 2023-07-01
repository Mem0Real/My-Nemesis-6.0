"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Add, Remove } from "@mui/icons-material";
import { useCartContext } from "@/context/cartContext";
import { useItemContext } from "@/context/itemContext";

export default function AddToCart({ modal, closeModal, item }) {
  const [order, setOrder] = useState();
  const [quantity, setQuantity] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [newCart, setNewCart] = useState(false);
  const [remainingQuantity, setRemainingQuantity] = useState();

  const { cartData, setCartData } = useCartContext();
  const { fetchCache } = useItemContext();

  useEffect(() => {
    setQuantity(() => 1);
  }, []);

  useEffect(() => {
    setTotalPrice(() => quantity * item.price);
  }, [item.price, quantity]);

  // Add new order
  useEffect(() => {
    if (quantity >= 1) {
      setOrder((prev) => ({
        ...prev,
        data: item,
        quantity: quantity,
        price: totalPrice,
      }));
    } else setOrder([]);
  }, [quantity, item, totalPrice]);

  useEffect(() => {
    if (quantity >= 1) {
      let remaining = item.quantity - quantity;
      setRemainingQuantity(remaining);
    }
  }, [quantity, item.quantity]);

  useEffect(() => {
    window.localStorage.setItem("Cart_State", JSON.stringify(newCart));
  }, [newCart]);

  useEffect(() => {
    if (cartData[0] && cartData[0].data) setNewCart(true);
    else setNewCart(false);
  }, [cartData]);

  const handleChange = (e) => {
    setQuantity(() => e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (order) {
      if (cartData.length > 0) {
        const cartList = [...cartData];
        const itemName = cartList.find(
          (item) => item.data.name === order.data.name
        );
        if (itemName) {
          itemName.quantity = quantity;
          setCartData(cartList);
        } else {
          setCartData((prev) => [...prev, order]);
        }
      } else {
        setCartData((prev) => [...prev, order]);
      }

      const cache = JSON.parse(window.localStorage.getItem("Product_Data"));

      // If cache exists check id for current product
      if (cache && cache.length > 0) {
        // Update
        const productCache = cache.find(
          (product) => product.id === order.data.id
        );
        if (productCache) {
          const updatedCache = cache.map((prod) =>
            prod.id === order.data.id
              ? { ...prod, remainingQty: remainingQuantity }
              : prod
          );
          console.log("UpdatedCache", updatedCache);
          window.localStorage.setItem(
            "Product_Data",
            JSON.stringify(updatedCache)
          );
          fetchCache(order.data.id, order.data.quantity);
        } else {
          cache.push({
            id: order.data.id,
            remainingQty: remainingQuantity,
          });
          window.localStorage.setItem("Product_Data", JSON.stringify(cache));
          fetchCache(order.data.id, order.data.quantity);
        }
      } else {
        let data = [];
        data.push({
          id: order.data.id,
          remainingQty: remainingQuantity,
        });
        console.log(data);
        window.localStorage.setItem("Product_Data", JSON.stringify(data));
        fetchCache(order.data.id, order.data.quantity);
      }
    }

    closeModal();
  };

  const handleMinus = () => {
    setQuantity((prev) => --prev);
  };
  const handlePlus = () => {
    setQuantity((prev) => ++prev);
  };

  return (
    <Modal
      open={modal}
      onClose={closeModal}
      aria-labelledby="Order Modal"
      aria-describedby=""
      className="bg-neutral-900/20 backdrop-blur-sm"
    >
      <Box>
        <div className="shadow bg-neutral-800 text-neutral-200 rounded-2xl py-6 absolute w-[90%] md:w-1/2 right-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button
            name="close-modal"
            type="button"
            className="absolute top-2 right-2 md:top-3 md:right-3 text-neutral-200 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
            <h3 className="mb-4 py-4 text-3xl text-center font-black">
              <p className="mt-5">{item.name}</p>
            </h3>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4"
          >
            <h1 className="px-5 py-2">Quantity</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={handleMinus}
                type="button"
                disabled={quantity === 1}
                className="disabled:text-neutral-600 disabled:hover:cursor-not-allowed "
              >
                <Remove />
              </button>
              <input
                type="number"
                name="amount"
                id="amount"
                className="text-center pl-2.5 py-2 rounded-xl bg-neutral-800 text-neutral-200 border border-neutral-200"
                value={quantity || ""}
                onChange={handleChange}
                required
                min={1}
                max={item.quantity}
              />
              <button
                onClick={handlePlus}
                type="button"
                disabled={quantity === item.quantity}
                className="disabled:text-neutral-600 disabled:hover:cursor-not-allowed"
              >
                <Add />
              </button>
            </div>
            <div className="flex gap-2 md:self-end md:mr-5 md:mt-6">
              <h1 className="m-auto">Product Remaining: </h1>
              <p className="text-sm m-auto font-light italic">
                {remainingQuantity}
              </p>
            </div>
            <div className="flex gap-2 md:self-end md:mr-5">
              <h1 className="m-auto">Total Price: </h1>
              <p className="text-sm m-auto font-light italic">
                {item.price * quantity} ETB
              </p>
            </div>
            <button
              name="submit"
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-5"
            >
              Confirm
            </button>
          </form>
        </div>
      </Box>
    </Modal>
  );
}
