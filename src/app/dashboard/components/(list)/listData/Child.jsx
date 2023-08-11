"use client";

import React from "react";
import Link from "next/link";

import { useDataContext } from "../List";
import { useTableContext } from "../ListTable";

import Item from "./Item";

import { AnimatePresence, motion } from "framer-motion";

import { useIcons } from "@/app/utils/CustomIcons";

export default function Child({ categoryId, parentId, child }) {
  const { data, handleAdd, handleEdit, handleDelete } = useDataContext();
  const { par, chi, buttonVariants, contentVariants, toggleChiDrop } =
    useTableContext();

  const items = data[3];

  const { RightArrowIcon, PlusIcon, EditIcon, DeleteIcon } = useIcons();

  return [
    <AnimatePresence key={child.id}>
      {par?.id === parentId && par?.open === true && (
        <motion.tr
          key={child.id}
          className={`cursor-pointer bg-neutral-400 dark:bg-neutral-600 hover:bg-neutral-500 dark:hover:bg-neutral-500 ${
            chi.id === child.id && chi.open === true && "font-semibold"
          }`}
          initial="close"
          animate={
            par?.id === parentId && par?.open === true ? "open" : "close"
          }
          exit="close"
          variants={contentVariants}
          onClick={() => toggleChiDrop(child.id)}
        >
          <td className="py-4">
            <div className="list-outside flex items-center gap-3">
              <motion.div
                className={`text-sm text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 hover:dark:text-neutral-400`}
                initial="close"
                animate={
                  chi?.id === child.id && chi?.open === true ? "open" : "close"
                }
                exit="close"
                variants={buttonVariants}
              >
                {RightArrowIcon}
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }}>
                <Link
                  className="hover:underline underline-offset-4 z-10"
                  href={`catalogue/${categoryId}/${parentId}/${child.id}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {child.name}
                </Link>{" "}
              </motion.div>
            </div>
          </td>
          <td className="pl-6 py-3">{child.description}</td>
          <td>
            <div className="flex items-center justify-center gap-3">
              <motion.div
                className="text-green-700 text-base"
                onClick={() =>
                  handleAdd("items", categoryId, parentId, child.id)
                }
                whileHover={{
                  scale: 1.5,
                }}
                whileTap={{
                  scale: 1,
                }}
              >
                {PlusIcon}
              </motion.div>
              <motion.div
                className="text-blue-700 text-base"
                onClick={() => handleEdit("children", child)}
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
                onClick={() => handleDelete("children", child)}
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
    <AnimatePresence key={child.id + "items"}>
      {chi.id === child.id && chi.open === true && (
        <motion.tr
          key={`${child.id}-table`}
          initial="close"
          animate={chi.id === child.id && chi.open === true ? "open" : "close"}
          exit="close"
          variants={contentVariants}
        >
          <td colSpan={3}>
            <div className="mx-auto mt-5 rounded-xl overflow-auto overflow-y-hidden no-scrollbar">
              <table
                className="table-fixed w-full"
                border={2}
                bordercolor="black"
              >
                <thead>
                  <tr>
                    <th className="text-center border border-black dark:border-white py-2 w-36 md:w-40 lg:w-36">
                      Name
                    </th>
                    <th className="text-center border border-black dark:border-white py-2 w-64 md:w-80 lg:w-96">
                      Description
                    </th>
                    <th className="text-center border border-black dark:border-white py-2 w-24">
                      Brand
                    </th>
                    <th className="text-center border border-black dark:border-white py-2 w-24">
                      Model
                    </th>
                    <th className="text-center border border-black dark:border-white py-2 w-24 md:w-24 lg:w-24">
                      Qunatity
                    </th>
                    <th className="text-center border border-black dark:border-white py-2 w-24 md:w-24 lg:w-24">
                      Price
                    </th>
                    <th className="w-20 md:w-14 lg:w-20 border border-black dark:border-white" />
                  </tr>
                </thead>
                <tbody>
                  {items.map(
                    (item) =>
                      item.ChildId === child.id && (
                        <React.Fragment key={item.id}>
                          <Item
                            categoryId={categoryId}
                            parentId={parentId}
                            childId={child.id}
                            item={item}
                          />
                        </React.Fragment>
                      )
                  )}
                </tbody>
              </table>
            </div>
            <span className="w-full flex items-center justify-center py-3">
              <motion.button
                id="addItemButton"
                className="px-2 py-1 rounded-md  bg-transparent text-neutral-800 dark:text-neutral-200 outline outline-1 outline-green-600 dark:outline-green-500"
                onClick={() =>
                  handleAdd("items", categoryId, parentId, child.id)
                }
                whileTap={{
                  scale: 0.9,
                }}
                whileHover={{
                  borderRadius: "10px",
                }}
              >
                Add Product
              </motion.button>
            </span>
          </td>
        </motion.tr>
      )}
    </AnimatePresence>,
  ];
}
