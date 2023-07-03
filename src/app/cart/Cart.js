"use client";

import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ContactInfo from "./ContactInfo";
import { Add, Remove, Clear } from "@mui/icons-material";
import { useProductContext } from "@/context/productContext";

export default function Cart({ closeCart, modal }) {
  const [data, setData] = useState(false);
  const [infoModal, showInfoModal] = useState(false);
  const [cartList, setCartList] = useState();
  const [update, setUpdate] = useState(false);

  const { subtractQuantity, addQuantity } = useProductContext();

  // useEffect(() => {
  //   if (cartData && cartData.length > 0) {
  //     let arr = [];
  //     cartData.forEach((item) =>
  //       arr.push({
  //         id: item?.data?.id,
  //         name: item?.data?.name,
  //         originalQuantity: item?.data?.quantity,
  //         selectedQuantity: parseInt(item?.quantity),
  //         productPrice: item?.data?.price,
  //         totalPrice: item?.price,
  //       })
  //     );
  //     // console.log(arr);
  //     setCartItems(arr);
  //     showButtons(true);
  //   } else {
  //     setOrder([]);
  //     showButtons(false);
  //   }
  // }, [cartData]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("Cart"));
    if (cart?.length > 0) {
      setData(() => true);
      setCartList(() => cart);
    } else {
      setData(() => false);
    }
  }, [update]);

  const clearCart = () => {
    window.localStorage.removeItem("Cart_Data");
    window.localStorage.removeItem("Product_Data");

    cartItems.map((item) => {
      // refetch(item.id, item.quantity);
    });

    setCartData(() => []);
    setCartItems(() => []);

    closeCart();
  };

  const handleMinus = (id) => {
    const updatedQuantity = cartList.map((item) => {
      if (item.id === id) {
        return { ...item, selectedQuantity: item.selectedQuantity - 1 };
      }
      return item;
    });

    subtractQuantity(id);
    setUpdate(!update);
    // const updatedProduct = updatedQuantity.map((item) => ({
    //   id: item.id,
    //   remainingQty: item.originalQuantity - item.selectedQuantity,
    // }));
    // setCartItems(updatedQuantity);
    // localStorage.setItem("Cart_Data", JSON.stringify(updatedQuantity));
    // localStorage.setItem("Product_Data", JSON.stringify(updatedProduct));
  };

  const handlePlus = (id) => {
    const updatedQuantity = cartList.map((item) => {
      if (item.id === id) {
        return { ...item, selectedQuantity: item.selectedQuantity + 1 };
      }
      return item;
    });

    addQuantity(id);
    setUpdate(!update);
    // const updatedProduct = updatedQuantity.map((item) => ({
    //   id: item.id,
    //   remainingQty: item.originalQuantity - item.selectedQuantity,
    // }));
    // setCartItems(updatedQuantity);
    // localStorage.setItem("Cart_Data", JSON.stringify(updatedQuantity));
    // localStorage.setItem("Product_Data", JSON.stringify(updatedProduct));
  };

  const handleChange = (id, e) => {
    const updatedQuantity = cartList.map((item) => {
      if (item.id === id) {
        if (e.target.value > item.originalQuantity) {
          return { ...item, selectedQuantity: parseInt(item.originalQuantity) };
        }
        if (e.target.value < 1) {
          return { ...item, selectedQuantity: 1 };
        }

        return { ...item, selectedQuantity: parseInt(e.target.value) };
      }
      return item;
    });

    const updatedProduct = updatedQuantity.map((item) => ({
      id: item.id,
      remainingQty: item.originalQuantity - item.selectedQuantity,
    }));

    setCartItems(updatedQuantity);
    localStorage.setItem("Cart_Data", JSON.stringify(updatedQuantity));
    localStorage.setItem("Product_Data", JSON.stringify(updatedProduct));
  };

  const handleRemove = (id, quantity) => {
    const updatedCart = [];
    const updatedProduct = [];

    cartItems.map((item) => item.id !== id && updatedCart.push(item));
    // for (let i = 0; i < cartItems.length; i++) {
    //   if (cartItems[i].id !== id) {
    //     // fetchCache(id);
    //     updatedCart.push(cartData[i]);
    //   }
    // }

    const cache = JSON.parse(window.localStorage.getItem("Product_Data"));

    // If cache exists check id for current product
    const productCache = cache.find((product) => product.id === id);
    if (productCache) {
      const updatedCache = cache.map((prod) =>
        prod.id === id
          ? {
              ...prod,
              remainingQty: quantity,
            }
          : prod
      );
      window.localStorage.setItem("Product_Data", JSON.stringify(updatedCache));
      // refetch(id, quantity);
    }

    window.localStorage.setItem("Cart_Data", JSON.stringify(updatedCart));
    window.localStorage.setItem("Product_Data", JSON.stringify(updatedProduct));
    setCartData(updatedCart);
  };

  const handleOrder = () => {
    closeCart();
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
        return items.totalPrice;
      });
      allPrice = allPrice.reduce((sum, i) => sum + i, 0);
      return allPrice;
    }
  }

  const invoiceSubtotal = subtotal();
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <>
      <Modal
        open={modal}
        onClose={closeCart}
        aria-labelledby="Cart Modal"
        aria-describedby="list of cart items"
        className="bg-neutral-900/20 backdrop-blur-sm"
      >
        <Box>
          <div className="shadow bg-neutral-800 text-neutral-200 rounded-2xl py-6 absolute w-[95%] mx-auto md:w-1/2 right-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button
              name="close-modal"
              type="button"
              className="absolute top-1 right-1 md:top-3 text-neutral-200 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-lg md:text-xl xl:text-2xl text-center font-semibold border-b border-neutral-200 w-full pb-3">
                Cart
              </h1>
              <h1 className="py-1 self-start text-lg px-2 underline underline-offset-2">
                List of items
              </h1>
              <table className="shadow-inner w-auto md:w-[90%] bg-neutral-900 shadow-black/60 rounded rounded-b-2xl border-collapse">
                <thead>
                  <tr className="border-b border-1 border-neutral-200">
                    <th className="text-left py-4 ps-2">Product</th>
                    <th className="text-center py-4 ps-2">Quantity</th>
                    <th
                      className="text-right py-4 pe-2"
                      colSpan={2}
                      align="right"
                    >
                      Price
                    </th>
                    <th className="py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {data == true ? (
                    <>
                      {cartList.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-neutral-200"
                        >
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
                              onClick={() =>
                                handleRemove(item.id, item.quantity)
                              }
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
              <div className="flex items-center justify-center gap-12 w-full text-base">
                {data && (
                  <>
                    <button
                      className="w-24 py-2 rounded outline outline-1 outline-green-600 hover:outline-2 active:outline-4 font-thin"
                      onClick={handleOrder}
                    >
                      Order
                    </button>
                    <button
                      onClick={clearCart}
                      className="w-24 py-2 rounded outline outline-1 outline-red-600 hover:outline-2 active:outline-4 font-thin"
                    >
                      Clear
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      {/* <ContactInfo
        modal={infoModal}
        closeInfoModal={closeInfoModal}
        cartItems={cartItems}
        orderData={order}
        orderTotalPrice={invoiceTotal}
        clearCart={clearCart}
      /> */}
    </>
  );
}
