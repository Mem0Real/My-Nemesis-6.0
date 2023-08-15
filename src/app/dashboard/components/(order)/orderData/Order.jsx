"use client";

import React from "react";
import { useOrderContext } from "../OrderTable";
import { AnimatePresence, motion } from "framer-motion";
import { useIcons } from "@/app/utils/CustomIcons";
import formatCurrency from "@/app/utils/formatCurrency";

export default function Order({ customerId, currentOrder }) {
  const { cus } = useOrderContext();
  const { BagIcon } = useIcons();

  const variants = {
    open: {
      y: 0,
      opacity: 1,
    },
    closed: {
      y: "-10px",
      opacity: 0,
    },
  };

  return [
    <AnimatePresence key={currentOrder.id}>
      {cus?.id === customerId && cus?.open === true && (
        <motion.tr
          key={currentOrder.id}
          animate={
            cus?.id === customerId && cus?.open === true ? "open" : "closed"
          }
          variants={variants}
          exit={"closed"}
          className={`${
            cus?.id === currentOrder.id && cus?.open === true && "font-semibold"
          }`}
          whileHover={{ backgroundColor: "#999" }}
        >
          <td className="py-2 max-w-md text-center">
            <div className="flex items-center gap-2 mx-auto px-auto">
              <span className="flex-none self-start">{BagIcon}</span>
              <span className="self-center">{currentOrder.productName}</span>
            </div>
          </td>
          <td className="py-2 max-w-md text-center">
            {currentOrder.orderedQuantity}
          </td>
          <td className="py-2 max-w-md text-center">
            <div className="flex gap-2 items-center justify-center">
              {formatCurrency(parseFloat(currentOrder.productPrice).toFixed(2))}
              <span className="text-xs italic text-neutral-500">ETB</span>
            </div>
          </td>
        </motion.tr>
      )}
    </AnimatePresence>,
  ];
}
