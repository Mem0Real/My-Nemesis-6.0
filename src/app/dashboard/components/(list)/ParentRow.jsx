"use client";

import React from "react";
import Link from "next/link";

import { useDataContext } from "./List";
import { useTableContext } from "./MyTable";

import ChildRow from "./ChildRow";

import { AnimatePresence, motion } from "framer-motion";
import {
  RightOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

export default function ParentRow({ categoryId, parent }) {
  const { data, handleAdd, handleEdit, handleDelete } = useDataContext();

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
          <td className="py-2">
            <div
              className="list-outside flex items-center gap-3 transition-all ease-in-out duration-300"
              onClick={toggleExpander}
            >
              <RightOutlined
                className={`text-sm transition-all ease-in-out duration-500 text-neutral-800 hover:text-neutral-950 ${
                  par.id === parent.id && par.open === true
                    ? "rotate-90 translate-x-0.5 translate-y-0.5"
                    : ""
                }`}
              />
              <Link
                className="hover:underline underline-offset-4 z-10"
                href={`collection/${categoryId}/${parent.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                {parent.name}
              </Link>
            </div>
          </td>
          <td
            className="px-3 py-4 text-center md:text-start"
            onClick={toggleExpander}
          >
            {parent.description}
          </td>
          <td className="flex items-center gap-3">
            {/* <div className="flex items-center gap-3 px-6"> */}
            <PlusOutlined
              className="text-green-700"
              onClick={() => handleAdd("children", categoryId, parent.id)}
            />
            <EditOutlined
              className="text-blue-700"
              onClick={() => handleEdit("parents", parent)}
            />
            <DeleteOutlined
              className="text-red-700"
              onClick={() => handleDelete("parents", parent)}
            />
            {/* </div> */}
          </td>
        </motion.tr>
      )}
    </AnimatePresence>,

    children.map(
      (child) =>
        child.ParentId === parent.id && (
          <React.Fragment key={child.id}>
            <ChildRow
              categoryId={categoryId}
              parentId={parent.id}
              child={child}
            />
          </React.Fragment>
        )
    ),
  ];
}