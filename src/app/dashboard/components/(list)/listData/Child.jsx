"use client";

import React from "react";
import Link from "next/link";

import { useDataContext } from "../List";
import { useTableContext } from "../ListTable";

import Item from "./Item";

import { AnimatePresence, motion } from "framer-motion";
import {
  RightOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

export default function Child({ categoryId, parentId, child }) {
  const { data, handleAdd, handleEdit, handleDelete } = useDataContext();
  const { par, childDropDown, chi } = useTableContext();

  const items = data[3];

  const toggleExpander = () => {
    childDropDown(child.id);
  };

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
    <AnimatePresence key={child.id}>
      {par.id === parentId && par.open === true && (
        <motion.tr
          key={child.id}
          animate={par.id === parentId && par.open === true ? "open" : "closed"}
          variants={variants}
          exit={"closed"}
          className={`cursor-pointer bg-neutral-400/90 ${
            chi.id === child.id && chi.open === true && "font-semibold"
          }`}
          whileHover={{ backgroundColor: "#777" }}
        >
          <td className="py-3">
            <div
              className="list-outside flex items-center gap-3 transition-all ease-in-out duration-300"
              onClick={toggleExpander}
            >
              <RightOutlined
                className={`text-sm transition-all ease-in-out duration-500 text-neutral-800 hover:text-neutral-950 ${
                  chi.id === child.id && chi.open === true
                    ? "rotate-90 translate-x-0.5 translate-y-0.5"
                    : ""
                }`}
              />
              <Link
                className="hover:underline underline-offset-4 z-10"
                href={`collection/${categoryId}/${parentId}/${child.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                {child.name}
              </Link>
            </div>
          </td>
          <td className="pl-6 py-3" onClick={toggleExpander}>
            {child.description}
          </td>
          <td>
            <div className="flex items-center justify-center gap-3">
              <motion.div
                whileHover={{
                  scale: 1.5,
                }}
                whileTap={{
                  scale: 1,
                }}
              >
                <PlusOutlined
                  className="text-green-700 text-base"
                  onClick={() =>
                    handleAdd("items", categoryId, parentId, child.id)
                  }
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
                <EditOutlined
                  className="text-blue-700 text-base"
                  onClick={() => handleEdit("children", child)}
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
                  onClick={() => handleDelete("children", child)}
                />
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
          animate={chi.id === child.id && chi.open === true ? "open" : "closed"}
          variants={variants}
          exit={"closed"}
        >
          <td colSpan={3}>
            <div className="mx-auto mt-5 rounded-3xl border-2 border-neutral-700 overflow-auto">
              <table
                className="table-fixed w-full"
                border={2}
                bordercolor="black"
              >
                <thead>
                  <tr>
                    <th className="text-center border border-black py-2 w-36 md:w-40 lg:w-36">
                      Name
                    </th>
                    <th className="text-center border border-black py-2 w-64 md:w-80 lg:w-96">
                      Description
                    </th>
                    <th className="text-center border border-black py-2 w-24">
                      Brand
                    </th>
                    <th className="text-center border border-black py-2 w-24">
                      Model
                    </th>
                    <th className="text-center border border-black py-2 w-24 md:w-24 lg:w-24">
                      Qunatity
                    </th>
                    <th className="text-center border border-black py-2 w-24 md:w-24 lg:w-24">
                      Price
                    </th>
                    <th className="w-20 md:w-14 lg:w-20 border border-black" />
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
                className="px-3 py-2 rounded-md bg-green-900 text-neutral-200"
                onClick={() =>
                  handleAdd("items", categoryId, parentId, child.id)
                }
                whileTap={{
                  scale: 0.9,
                }}
                whileHover={{
                  backgroundColor: "rgba(18 58 18 0.9)",
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
