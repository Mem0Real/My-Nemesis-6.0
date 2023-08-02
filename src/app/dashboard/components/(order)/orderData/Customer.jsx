"use client";

import React, { useState } from "react";

import Order from "./Order";

import { useOrderContext } from "../OrderTable";
import { useOrderDataContext } from "../Order";

import { AnimatePresence, motion } from "framer-motion";

import { useIcons } from "@/app/utils/CustomIcons";
import { toast } from "react-hot-toast";

export default function Customer({ customer }) {
  const [hovering, setHovering] = useState(false);
  const [deliverLoading, setDeliverLoading] = useState(false);

  const { order, markDelivered } = useOrderDataContext();
  const {
    customerDropDown,
    cus,
    handleRemove,
    removeLoading,
    contentVariants,
    buttonVariants,
  } = useOrderContext();

  const {
    RightArrowIcon,
    NotDeliveredIcon,
    DeliveredIcon,
    DeleteIcon,
    LoadingIcon,
  } = useIcons();

  const orders = order[1];

  const currentOrder = orders.filter(
    (order) => order.customerId === customer.id
  );

  const toggleExpander = () => {
    customerDropDown(customer.id);
  };

  const handleDeliver = async (entry, id, current) => {
    setDeliverLoading(() => true);
    const res = await markDelivered(entry, id, current);

    setDeliverLoading(() => false);
    if (res?.error) toast.error(res.error);
    else {
      toast.success(res.success);
    }
  };

  const TAX_RATE = 0.07;

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  const subTotal = () => {
    const orders = order[1];
    let userDebt = [];
    orders.map((order) => {
      if (order.customerId === customer.id) {
        userDebt.push(parseFloat(order.productPrice));
      }
    });
    let allPrice = userDebt.reduce((sum, i) => sum + i, 0);
    return allPrice;
  };

  const invoiceSubtotal = subTotal();
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  let invoiceTotal = invoiceTaxes + invoiceSubtotal;
  invoiceTotal = ccyFormat(invoiceTotal);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const totalPrice = formatter.format(invoiceTotal);

  return [
    <motion.tr
      key={customer.id}
      className={`bg-neutral-200 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-700 ${
        cus?.id === customer.id && cus?.open === true && "font-semibold"
      }`}
      animate="open"
      variants={contentVariants}
      initial="close"
      exit="close"
      onClick={toggleExpander}
    >
      <motion.td className="py-2 flex items-center gap-3">
        <motion.span
          className={`text-sm text-neutral-800 hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-neutral-300 `}
          initial="close"
          animate={
            cus?.id === customer.id && cus?.open === true ? "open" : "close"
          }
          variants={buttonVariants}
        >
          {RightArrowIcon}
        </motion.span>
        {customer.name}
      </motion.td>
      <motion.td className="py-4 max-w-36 text-center md:text-start">
        +251 {customer.phone}
      </motion.td>
      <td>
        <div className="flex items-center justify-center gap-2 md:gap-3 lg:gap-5">
          <motion.div onClick={(e) => e.stopPropagation()}>
            <AnimatePresence>
              {deliverLoading ? (
                <motion.div
                  key="loader"
                  className={`text-green-600 w-fit`}
                  disabled
                  animate={{
                    x: 0,
                    rotate: 360,
                  }}
                  transition={{
                    ease: "linear",
                    duration: 1,
                    repeat: Infinity,
                  }}
                >
                  {LoadingIcon}
                </motion.div>
              ) : customer.delivered ? (
                <motion.div
                  whileHover={{
                    scale: 1.2,
                    textShadow: "4px 0px 0px black",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-lg md:text-xl lg:text-2xl pb-2 cursor-pointer text-green-700/70 dark:text-green-700/40`}
                  onClick={() =>
                    handleDeliver("customers", customer.id, customer.delivered)
                  }
                >
                  {DeliveredIcon}
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{
                    scale: 1.2,
                    textShadow: "4px 0px 0px black",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-lg md:text-xl lg:text-2xl pb-2 cursor-pointer text-green-700 dark:text-green-700`}
                  onClick={() =>
                    handleDeliver("customers", customer.id, customer.delivered)
                  }
                >
                  {NotDeliveredIcon}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <motion.div onClick={(e) => e.stopPropagation()}>
            <AnimatePresence>
              {removeLoading &&
              removeLoading.id === customer.id &&
              removeLoading.loading ? (
                <motion.div
                  className={`text-red-600/90 cursor-pointer`}
                  disabled
                  animate={{
                    x: 0,
                    rotate: 360,
                  }}
                  transition={{
                    ease: "linear",
                    duration: 1,
                    repeat: Infinity,
                  }}
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 1 }}
                >
                  {LoadingIcon}
                </motion.div>
              ) : (
                <motion.div
                  className="text-lg md:text-xl lg:text-2xl pb-2 text-red-600/90 cursor-pointer"
                  onClick={() => handleRemove(customer.id)}
                  whileHover={{
                    scale: 1.2,
                    textShadow: "4px 0px 12px red",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {DeleteIcon}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </td>
    </motion.tr>,
    <AnimatePresence key={customer.id + "orders"}>
      {cus?.id === customer.id &&
        cus?.open === true &&
        (currentOrder.length > 0 ? (
          <motion.tr
            key={`${customer.id}-table`}
            animate={
              cus?.id === customer.id && cus?.open === true ? "open" : "close"
            }
            initial="close"
            variants={contentVariants}
            exit="close"
          >
            <td
              colSpan={3}
              className="bg-neutral-300 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
            >
              <div className="mx-auto">
                <table className="table-fixed w-full overflow-hidden border-0">
                  <thead>
                    <tr>
                      <th className="text-start py-2 w-9 border-b border-black dark:border-white">
                        Product Name
                      </th>
                      <th className="text-center py-2 w-6 border-b border-black dark:border-white">
                        Ordered Amount
                      </th>
                      <th className="text-center py-2 w-6 border-b border-black dark:border-white">
                        Product Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(
                      (order) =>
                        order.customerId === customer.id && (
                          <React.Fragment key={order.id}>
                            <Order
                              customerId={customer.id}
                              currentOrder={order}
                            />
                          </React.Fragment>
                        )
                    )}
                    <AnimatePresence key={currentOrder.id + 1}>
                      {cus?.id === customer.id && cus?.open === true && (
                        <motion.tr
                          animate={
                            cus?.id === customer.id && cus?.open === true
                              ? "open"
                              : "close"
                          }
                          initial="close"
                          variants={contentVariants}
                          exit="close"
                        >
                          <td className="border-t border-neutral-900 dark:border-neutral-100" />
                          <td
                            colSpan={2}
                            align="right"
                            className="pt-2 pb-3 font-semibold border-t border-neutral-900 dark:border-neutral-100"
                          >
                            <div className="flex flex-col items-end justify-center gap-3 md:gap-2 pr-3 lg:mr-10">
                              <div className="flex gap-4 justify-end items-center lg:pr-10 lg:py-2">
                                <span className="font-normal">SubTotal: </span>
                                <div className="flex items-center justify-center gap-1">
                                  <span className="font-normal">
                                    {formatter.format(invoiceSubtotal)}
                                  </span>
                                  <span className="text-xs italic text-neutral-500 font-bold">
                                    ETB
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-4 justify-end items-center lg:pr-10 lg:py-2">
                                <div>
                                  <span className="font-normal">Tax</span>
                                  <span className="font-thin italic text-sm">
                                    ({parseInt(TAX_RATE * 100)}%)
                                  </span>
                                  :
                                </div>
                                <div className="flex gap-1 justify-center items-center">
                                  <span className="font-normal">
                                    {formatter.format(invoiceTaxes)}
                                  </span>
                                  <span className="text-xs italic text-neutral-500 font-bold">
                                    ETB
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-4 justify-end items-center lg:pr-10 py-2 w-full border-t border-neutral-900 dark:border-neutral-100">
                                <span>Total Price:</span>
                                <div className="flex gap-1 items-center">
                                  <span>{totalPrice}</span>
                                  <span className="text-xs italic text-neutral-500 font-bold">
                                    ETB
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </td>
          </motion.tr>
        ) : (
          <motion.tr
            key={`${customer.id}-table`}
            animate={
              cus?.id === customer.id && cus?.open === true ? "open" : "closed"
            }
            variants={contentVariants}
            exit={"closed"}
            whileHover={{ backgroundColor: "#777" }}
          >
            <td colSpan={3} align="center" className="py-2">
              <em>No orders from {customer.name}</em>
            </td>
          </motion.tr>
        ))}
    </AnimatePresence>,
  ];
}
