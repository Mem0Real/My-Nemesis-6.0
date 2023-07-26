"use client";

import React from "react";
import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";

import { useDataContext } from "../List";
import { useTableContext } from "../ListTable";

import { useIcons } from "@/app/utils/CustomIcons";

export default function Item({ categoryId, parentId, childId, item }) {
  const { chi, contentVariants } = useTableContext();
  const { handleEdit, handleDelete } = useDataContext();

  const { BagIcon, EditIcon, DeleteIcon } = useIcons();

  // const variants = {
  //   open: {
  //     y: "10px",
  //     opacity: 1,
  //   },
  //   closed: {
  //     y: "-10px",
  //     opacity: 0,
  //   },
  // };
  return [
    <AnimatePresence key={item.id}>
      {chi.id === childId && chi.open === true && (
        <motion.tr
          key={item.id}
          animate={chi.id === childId && chi.open === true ? "open" : "close"}
          variants={contentVariants}
          exit="close"
          className="border border-neutral-500"
        >
          <td className="border border-black dark:border-white py-5 max-w-md">
            <Link
              className="flex items-center gap-2 text-center hover:underline underline-offset-4"
              href={`/collection/${categoryId}/${parentId}/${childId}/${item.id}`}
            >
              {BagIcon}
              {item.name}
            </Link>
          </td>
          <td className="border border-black dark:border-white px-2 py-5 max-w-md text-center">
            {item.description}
          </td>
          <td className="border border-black dark:border-white px-2 py-5 max-w-md text-center">
            {item.brand}
          </td>
          <td className="border border-black dark:border-white px-2 py-5 max-w-md text-center">
            {item.model}
          </td>
          <td className="border border-black dark:border-white px-2 py-5 max-w-md text-center">
            {item.quantity}
          </td>
          <td className="border border-black dark:border-white px-2 py-5 max-w-md text-center">
            {item.price}
          </td>
          <td className="border border-black dark:border-white">
            <div className="flex items-center justify-center gap-3">
              <motion.div
                className="text-blue-700 text-base"
                onClick={() => handleEdit("items", item)}
                whileHover={{
                  scale: 1.5,
                }}
                whileTap={{
                  scale: 1,
                }}
              >
                {EditIcon}
              </motion.div>
              <motion.div
                className="text-red-700 text-base"
                onClick={() => handleDelete("items", item)}
                whileHover={{
                  scale: 1.5,
                }}
                whileTap={{
                  scale: 1,
                }}
              >
                {DeleteIcon}
              </motion.div>
            </div>
          </td>
        </motion.tr>
      )}
    </AnimatePresence>,
  ];
}
