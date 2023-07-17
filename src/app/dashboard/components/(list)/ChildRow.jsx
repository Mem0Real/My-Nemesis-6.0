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

const capitalize = (str) => {
  return str
    .split(" ")
    .map((s) => {
      return s.charAt(0).toUpperCase() + s.substr(1);
    })
    .join(" ");
};
export default function ChildRow({ parentId, child }) {
  const { data } = useDataContext();
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
              {capitalize(child.name)}
            </div>
          </td>
          <td className="pl-6 py-2" onClick={toggleExpander}>
            {child.description}
          </td>
          <td>
            <div className="flex items-center gap-3 px-6">
              <PlusOutlined className="text-green-700" />
              <EditOutlined className="text-blue-700" />
              <DeleteOutlined className="text-red-700" />
            </div>
          </td>
        </motion.tr>
      )}
    </AnimatePresence>,
    chi.id === child.id && chi.open === true && (
      <tr>
        <td colSpan={3}>
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
                      <ItemRow childId={child.id} item={item} />
                    </React.Fragment>
                  )
              )}
            </tbody>
          </table>
        </td>
      </tr>
    ),
  ];
}
