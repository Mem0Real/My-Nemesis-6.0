"use client";

import React from "react";
import { useDataContext } from "./List";
import ChildRow from "./ChildRow";
import { AnimatePresence, motion } from "framer-motion";
import {
  RightOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useTableContext } from "./MyTable";

const capitalize = (str) => {
  return str
    .split(" ")
    .map((s) => {
      return s.charAt(0).toUpperCase() + s.substr(1);
    })
    .join(" ");
};

export default function ParentRow({ categoryId, parent }) {
  const { data } = useDataContext();

  const { cat, parDropDown, par } = useTableContext();

  const children = data[2];

  const toggleExpander = (e) => {
    parDropDown(parent.id);
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
    <AnimatePresence key={parent.id}>
      {cat.id === categoryId && cat.open === true && (
        <motion.tr
          key={parent.id}
          animate={
            cat.id === categoryId && cat.open === true ? "open" : "closed"
          }
          variants={variants}
          exit={"closed"}
          className={`hover:border-b border-neutral-500 cursor-pointer ${
            par.id === parent.id && par.open === true && "font-semibold"
          }`}
        >
          <td className="pl-3 py-4" onClick={toggleExpander}>
            <div className="list-outside flex items-center gap-3">
              <RightOutlined
                className={`text-sm transition-all ease-in-out duration-500 text-neutral-800 hover:text-neutral-950 ${
                  par.id === parent.id && par.open === true
                    ? "rotate-90 translate-x-0.5 translate-y-0.5"
                    : ""
                }`}
              />
              {capitalize(parent.name)}
            </div>
          </td>
          <td className="pl-3 py-4" onClick={toggleExpander}>
            {capitalize(parent.description)}
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

    children.map(
      (child) =>
        child.ParentId === parent.id && (
          <React.Fragment key={child.id}>
            <ChildRow parentId={parent.id} child={child} />
          </React.Fragment>
        )
    ),
  ];
}
