"use client";

import React from "react";
import { useOrderContext } from "../MyOrderTable";
import { AnimatePresence, motion } from "framer-motion";

export default function ParentRow({ customerId, currentOrder }) {
  const { cus } = useOrderContext();

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

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return [
    <AnimatePresence key={currentOrder.id}>
      {cus.id === customerId && cus.open === true && (
        <motion.tr
          key={currentOrder.id}
          animate={
            cus.id === customerId && cus.open === true ? "open" : "closed"
          }
          variants={variants}
          exit={"closed"}
          className={`${
            cus.id === currentOrder.id && cus.open === true && "font-semibold"
          }`}
          whileHover={{ backgroundColor: "#999" }}
        >
          <td className="py-2 max-w-md text-center">
            {currentOrder.productName}
          </td>
          <td className="py-2 max-w-md text-center">
            {currentOrder.orderedQuantity}
          </td>
          <td className="py-2 max-w-md text-center">
            <div className="flex gap-2 items-center justify-center">
              {formatter.format(
                parseFloat(currentOrder.productPrice).toFixed(2)
              )}
              <span className="text-xs italic text-neutral-500">ETB</span>
            </div>
          </td>
        </motion.tr>
      )}
    </AnimatePresence>,
  ];
}
