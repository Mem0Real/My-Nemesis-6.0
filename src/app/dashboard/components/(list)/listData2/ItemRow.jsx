"use client";

import React from "react";
import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";

import { useDataContext } from "../List";
import { useTableContext } from "../MyTable";

import {
  DeleteOutlined,
  EditOutlined,
  SwapRightOutlined,
} from "@ant-design/icons";

export default function ItemRow({ categoryId, parentId, childId, item }) {
  const { chi } = useTableContext();
  const { handleEdit, handleDelete } = useDataContext();

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
      {chi.id === childId && chi.open === true && (
        <motion.tr
          key={item.id}
          animate={chi.id === childId && chi.open === true ? "open" : "closed"}
          variants={variants}
          exit={"closed"}
          className="border border-neutral-500"
        >
          <td className="border border-black py-5 max-w-md">
            <Link
              className="flex items-center gap-2 text-center hover:underline underline-offset-4"
              href={`/collection/${categoryId}/${parentId}/${childId}/${item.id}`}
            >
              <SwapRightOutlined />
              {item.name}
            </Link>
          </td>
          <td className="border border-black px-2 py-5 max-w-md text-center">
            {item.description}
          </td>
          <td className="border border-black px-2 py-5 max-w-md text-center">
            {item.brand}
          </td>
          <td className="border border-black px-2 py-5 max-w-md text-center">
            {item.model}
          </td>
          <td className="border border-black px-2 py-5 max-w-md text-center">
            {item.quantity}
          </td>
          <td className="border border-black px-2 py-5 max-w-md text-center">
            {item.price}
          </td>
          <td className="border border-black">
            <div className="flex items-center justify-center gap-3">
              <motion.div
                whileHover={{
                  scale: 1.5,
                }}
                whileTap={{
                  scale: 1,
                }}
              >
                <EditOutlined
                  className="text-blue-700 text-base"
                  onClick={() => handleEdit("items", item)}
                />
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.5,
                }}
                whileTap={{
                  scale: 1,
                }}
              >
                <DeleteOutlined
                  className="text-red-700 text-base"
                  onClick={() => handleDelete("items", item)}
                />
              </motion.div>
            </div>
          </td>
        </motion.tr>
      )}
    </AnimatePresence>,
  ];
}
