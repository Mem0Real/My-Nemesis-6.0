"use client";

import React from "react";

import OrderRow from "./OrderRow";

import { useOrderContext } from "../MyOrderTable";
import { useOrderDataContext } from "../Order";

// import { useDataContext } from "../List";
// import { useTableContext } from "../MyTable";
import { AnimatePresence, motion } from "framer-motion";

import {
  RightOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

export default function CustomerRow({ customer }) {
  const { order, markDelivered } = useOrderDataContext();
  const { customerDropDown, cus, alertDialogOpen } = useOrderContext();

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
  };
  return [
    <tr
      key={customer.id}
      className={`hover:border-b border-neutral-500 cursor-pointer ${
        cus.id === customer.id && cus.open === true && "font-semibold"
      }`}
    >
      <td className="py-2">
        <div
          className="list-outside flex items-center gap-3 transition-all ease-in-out duration-300"
          onClick={toggleExpander}
        >
          <RightOutlined
            className={`text-sm transition-all ease-in-out duration-500 text-neutral-800 hover:text-neutral-950 ${
              cus.id === customer.id && cus.open === true
                ? "rotate-90 translate-x-0.5 translate-y-0.5"
                : ""
            }`}
          />
          {customer.name}
        </div>
      </td>
      <td
        className="py-4 max-w-36 text-center md:text-start"
        onClick={toggleExpander}
      >
        +251 {customer.phone}
      </td>
      <td>
        <div className="flex items-center justify-center gap-2 md:gap-3 lg:gap-5">
          <CheckCircleOutlined
            className={`text-lg md:text-xl lg:text-2xl pb-2 trasition-all ease-in-out ${
              customer.delivered === true
                ? "text-green-700/50 hover:cursor-not-allowed"
                : "text-green-700 hover:cursor-pointer"
            }`}
            onClick={() => markDelivered("customers", customer.id)}
          />
          <CloseCircleOutlined
            className="text-red-700 text-lg md:text-xl lg:text-2xl pb-2"
            onClick={() => alertDialogOpen(customer.id)}
          />
        </div>
      </td>
    </tr>,
    cus.id === customer.id &&
      cus.open === true &&
      (currentOrder.length > 0 ? (
        <tr key={`${customer.id}-table`}>
          <td colSpan={3}>
            <div className="mx-auto mt-2 bg-[#ccc]">
              <table
                className="table-fixed w-full overflow-hidden"
                // border={2}
                // bordercolor="black"
              >
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
                    {cus.id === customer.id && cus.open === true && (
                      <motion.tr
                        animate={
                          cus.id === customer.id && cus.open === true
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
        </tr>
      ) : (
        <tr key={`${customer.id}-table`}>
          <td colSpan={3} align="center" className="py-2">
            <em>No orders from {customer.name}</em>
          </td>
        </tr>
      )),
  ];
}
