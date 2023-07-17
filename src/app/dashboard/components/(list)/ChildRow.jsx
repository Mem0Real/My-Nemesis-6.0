"use client";

import React from "react";
import ItemRow from "./ItemRow";
import { AnimatePresence, motion } from "framer-motion";
import {
  RightOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { useDataContext } from "./List";
import { useTableContext } from "./MyTable";

export default function ChildRow({ categoryId, parentId, child }) {
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
          className={`hover:border-b border-neutral-500 cursor-pointer ${
            chi.id === child.id && chi.open === true && "font-semibold"
          }`}
        >
          <td className="pl-6 py-2" onClick={toggleExpander}>
            <div className="list-outside flex items-center gap-3">
              <RightOutlined
                className={`text-sm transition-all ease-in-out duration-500 text-neutral-800 hover:text-neutral-950 ${
                  chi.id === child.id && chi.open === true
                    ? "rotate-90 translate-x-0.5 translate-y-0.5"
                    : ""
                }`}
              />
              {child.name}
            </div>
          </td>
          <td className="pl-6 py-2" onClick={toggleExpander}>
            {child.description}
          </td>
          <td>
            <div className="flex items-center gap-3">
              <PlusOutlined
                className="text-green-700"
                onClick={() =>
                  handleAdd("items", categoryId, parentId, child.id)
                }
              />
              <EditOutlined
                className="text-blue-700"
                onClick={() => handleEdit("children", child)}
              />
              <DeleteOutlined
                className="text-red-700"
                onClick={() => handleDelete("children", child)}
              />
            </div>
          </td>
        </motion.tr>
      )}
    </AnimatePresence>,
    chi.id === child.id && chi.open === true && (
      <tr key={`${child.id}-table`}>
        <td colSpan={3}>
          <div className="mx-auto w-[95%]">
            <table className="w-[95%] mx-auto py-5">
              <thead className="border-b border-black">
                <tr className="">
                  <th className="text-start ps-3 py-4">Name</th>
                  <th className="text-center py-4">Description</th>
                  <th className="text-center py-4">Brand</th>
                  <th className="text-center py-4">Model</th>
                  <th className="text-center py-4">Qunatity</th>
                  <th className="text-center py-4">Price</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {items.map(
                  (item) =>
                    item.ChildId === child.id && (
                      <React.Fragment key={item.id}>
                        <ItemRow
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
            <button
              className="px-3 py-2 rounded-md bg-green-700 text-neutral-200"
              onClick={() => handleAdd("items", categoryId, parentId, child.id)}
            >
              Add Product
            </button>
          </span>
        </td>
      </tr>
    ),
  ];
}
