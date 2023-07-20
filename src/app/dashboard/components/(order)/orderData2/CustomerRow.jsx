"use client";

import React, { useState } from "react";

import OrderRow from "./OrderRow";

import { useOrderContext } from "../MyOrderTable";
import { useOrderDataContext } from "../Order";

import { AnimatePresence, motion } from "framer-motion";

import {
  RightOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-hot-toast";

export default function CustomerRow({ customer }) {
  const [hovering, setHovering] = useState(false);
  const [deliverLoading, setDeliverLoading] = useState(false);

  const { order, markDelivered } = useOrderDataContext();
  const { customerDropDown, cus, handleRemove, removeLoading } =
    useOrderContext();

  const orders = order[1];

  const currentOrder = orders.filter(
    (order) => order.customerId === customer.id
  );

  const toggleExpander = () => {
    customerDropDown(customer.id);
  };

  const subTotal = () => {
    const orders = order[1];
    let userDebt = [];
    orders.map((order) => {
      if (order.customerId === customer.id) {
        userDebt.push(parseFloat(order.productPrice));
      }
    });
    let allPrice = userDebt.reduce((sum, i) => sum + i, 0);
    return allPrice.toFixed(2);
  };

  const handleDeliver = async (entry, id) => {
    setDeliverLoading(() => true);
    const res = await markDelivered(entry, id);

    setDeliverLoading(() => false);
    if (res?.error) toast.error(res.error);
    else {
      toast.success(res.success);
    }
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  let totalPrice = subTotal();
  totalPrice = formatter.format(totalPrice);

  const variants = {
    open: {
      y: "10px",
      opacity: 1,
    },
    closed: {
      y: "-10px",
      opacity: 0,
    },
    hover: {
      backgroundColor: "#777",
      cursor: "pointer",
    },
    none: {
      backgroundColor: "#ddd",
    },
    deliveredCheck: {
      color: "rgb(10 190 40)",
      opacity: 0.6,
      cursor: "not-allowed",
    },
    notDeliveredCheck: {
      color: "rgb(21 128 61)",
      opacity: 1,
      cursor: "pointer",
    },
    deliveredRemove: {
      color: "rgb(240 48 48)",
      opacity: 0.6,
      cursor: "not-allowed",
    },
    notDeliveredRemove: {
      color: "rgb(220 38 38)",
      opacity: 1,
      cursor: "pointer",
    },
  };
  return [
    <motion.tr
      key={customer.id}
      className={`${
        cus?.id === customer.id && cus?.open === true && "font-semibold"
      }`}
      animate={hovering ? "hover" : "none"}
      variants={variants}
      initial={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-20px" }}
    >
      <motion.td
        className="py-2"
        onHoverStart={() => setHovering(() => true)}
        onHoverEnd={() => setHovering(() => false)}
      >
        <div
          className="list-outside flex items-center gap-3 transition-all ease-in-out duration-300"
          onClick={toggleExpander}
        >
          <RightOutlined
            className={`text-sm transition-all ease-in-out duration-500 text-neutral-800 hover:text-neutral-950 ${
              cus?.id === customer.id && cus?.open === true
                ? "rotate-90 translate-x-0.5 translate-y-0.5"
                : ""
            }`}
          />
          {customer.name}
        </div>
      </motion.td>
      <motion.td
        onHoverStart={() => setHovering(() => true)}
        onHoverEnd={() => setHovering(false)}
        className="py-4 max-w-36 text-center md:text-start"
        onClick={toggleExpander}
      >
        +251 {customer.phone}
      </motion.td>
      <td>
        <div className="flex items-center justify-center gap-2 md:gap-3 lg:gap-5">
          <motion.div
            animate={
              customer.delivered ? "deliveredCheck" : "notDeliveredCheck"
            }
            variants={variants}
            whileHover={
              !customer.delivered && {
                scale: 1.2,
                textShadow: "4px 0px 0px black",
              }
            }
            whileTap={
              !customer.delivered && { scale: 0.9, cursor: "not-allowed" }
            }
          >
            {deliverLoading ? (
              <LoadingOutlined
                className={`text-lg md:text-xl lg:text-2xl pb-2 text-green-600`}
                disabled
              />
            ) : (
              <CheckCircleOutlined
                className={`text-lg md:text-xl lg:text-2xl pb-2`}
                onClick={() => handleDeliver("customers", customer.id)}
              />
            )}
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.2,
              textShadow: "4px 0px 12px red",
            }}
            whileTap={{ scale: 0.9 }}
          >
            {removeLoading &&
            removeLoading.id === customer.id &&
            removeLoading.loading ? (
              <LoadingOutlined
                className={`text-lg md:text-xl lg:text-2xl pb-2 text-red-600/90`}
                disabled
              />
            ) : (
              <CloseCircleOutlined
                className="text-lg md:text-xl lg:text-2xl pb-2 text-red-600/90"
                onClick={() => handleRemove(customer.id)}
              />
            )}
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
              cus?.id === customer.id && cus?.open === true ? "open" : "closed"
            }
            variants={variants}
            exit={"closed"}
            whileHover={{ backgroundColor: "#777" }}
          >
            <td colSpan={3}>
              <div className="mx-auto mt-2 bg-[#ccc]">
                <table className="table-fixed w-full overflow-hidden border-0">
                  <thead>
                    <tr>
                      <th className="text-center py-2 w-9 border-b border-black">
                        Product Name
                      </th>
                      <th className="text-center py-2 w-6 border-b border-black">
                        Ordered Amount
                      </th>
                      <th className="text-center py-2 w-6 border-b border-black">
                        Product Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(
                      (order) =>
                        order.customerId === customer.id && (
                          <React.Fragment key={order.id}>
                            <OrderRow
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
                              : "closed"
                          }
                          variants={variants}
                          exit={"closed"}
                        >
                          <td className="" />
                          <td
                            colSpan={2}
                            align="right"
                            className="pt-2 pb-3 font-semibold"
                          >
                            <div className="flex gap-4 justify-end items-center lg:pr-10 lg:py-2">
                              <span>Total Price:</span>
                              <div className="flex gap-1 items-center">
                                <span>{totalPrice}</span>
                                <span className="text-xs italic text-neutral-500 font-bold">
                                  ETB
                                </span>
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
            variants={variants}
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
