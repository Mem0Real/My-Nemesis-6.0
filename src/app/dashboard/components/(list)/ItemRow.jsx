"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SwapRightOutlined,
} from "@ant-design/icons";

export default function ItemRow({ item, expandedItem }) {
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
    <AnimatePresence key={item.id}>
      {expandedItem && (
        <motion.tr
          key={item.id}
          animate={expandedItem ? "open" : "closed"}
          variants={variants}
          exit={"closed"}
          className="border border-neutral-500"
        >
          <td className="py-5 max-w-md">
            <div className="flex items-center gap-2">
              <SwapRightOutlined />
              {item.name}
            </div>
          </td>
          <td className="px-2 py-5 max-w-md text-center">{item.description}</td>
          <td className="px-2 py-5 max-w-md text-center">{item.brand}</td>
          <td className="px-2 py-5 max-w-md text-center">{item.model}</td>
          <td className="px-2 py-5 max-w-md text-center">{item.quantity}</td>
          <td className="px-2 py-5 max-w-md text-center">{item.price}</td>
          <td>
            <div className="flex items-center gap-3 px-2">
              <PlusOutlined className="text-green-700" />
              <EditOutlined className="text-blue-700" />
              <DeleteOutlined className="text-red-700" />
            </div>
          </td>
        </motion.tr>
      )}
    </AnimatePresence>,
  ];
}
