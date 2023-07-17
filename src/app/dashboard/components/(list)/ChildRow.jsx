"use client";

import React, { useState } from "react";
import { useDataContext } from "./List";
import ItemRow from "./ItemRow";
import { RightOutlined } from "@ant-design/icons";
import { AnimatePresence, motion } from "framer-motion";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

const capitalize = (str) => {
  return str
    .split(" ")
    .map((s) => {
      return s.charAt(0).toUpperCase() + s.substr(1);
    })
    .join(" ");
};
export default function ChildRow({ child, expandedChild }) {
  const [expanded, setExpanded] = useState(false);

  const { data } = useDataContext();

  const items = data[3];

  const toggleExpander = (e) => {
    setExpanded((prev) => !prev);
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
      {expandedChild && (
        <motion.tr
          key={child.id}
          animate={expandedChild ? "open" : "closed"}
          variants={variants}
          exit={"closed"}
          className={`hover:border-b border-neutral-500 cursor-pointer ${
            expanded && "border-b-2 hover:border-b-2 border-neutral-600"
          }`}
        >
          <td className="pl-6 py-2" onClick={toggleExpander}>
            <div className="list-outside flex items-center gap-3">
              <RightOutlined
                className={`text-sm transition-all ease-in-out duration-500 text-neutral-800 hover:text-neutral-950 ${
                  expanded ? "rotate-90 translate-x-0.5 translate-y-0.5" : ""
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
    expanded && (
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
                      <ItemRow item={item} expandedItem={expanded} />
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
