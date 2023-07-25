"use client";

import React from "react";
import Link from "next/link";

import Parent from "./Parent";

import { useDataContext } from "../List";
import { useTableContext } from "../ListTable";

import { motion } from "framer-motion";

import { useIcons } from "@/app/utils/CustomIcons";

export default function Category({ category }) {
  const { data, handleAdd, handleEdit, handleDelete } = useDataContext();
  const { catDropDown, cat } = useTableContext();

  const parents = data[1];

  const { RightArrowIcon, PlusIcon, EditIcon, DeleteIcon } = useIcons();

  const toggleExpander = () => {
    catDropDown(category.id);
  };

  const buttonVariants = {
    open: {
      rotate: 90,
      x: 0.5,
      y: 0.5,
    },
    close: {
      rotate: 0,
      x: 0,
      y: 0,
    },
  };
  return [
    <motion.tr
      key={category.id}
      className={`cursor-pointer bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 ${
        cat.id === category.id && cat.open === true && "font-semibold"
      }`}
    >
      <td className="py-2" onClick={toggleExpander}>
        <div className="list-outside flex items-center gap-3">
          <motion.div
            className={`text-sm text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 hover:dark:text-neutral-400 `}
            initial="open"
            animate={
              cat.id === category.id && cat.open === true ? "open" : "close"
            }
            exit="close"
            variants={buttonVariants}
          >
            {RightArrowIcon}
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }}>
            <Link
              className="hover:underline underline-offset-4 z-10"
              href={`collection/${category.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              {category.name}
            </Link>
          </motion.div>
        </div>
      </td>
      <td
        className="py-4 max-w-36 text-center md:text-start"
        onClick={toggleExpander}
      >
        {category.description}
      </td>
      <td>
        <div className="flex items-center justify-center gap-3">
          <motion.div
            whileHover={{
              scale: 1.3,
            }}
            whileTap={{
              scale: 1,
            }}
            className="text-green-700 text-base"
            onClick={() => handleAdd("parents", category.id)}
          >
            {PlusIcon}
          </motion.div>

          <motion.div
            className="text-blue-700 text-base"
            onClick={() => handleEdit("categories", category)}
            whileHover={{
              scale: 1.3,
            }}
            whileTap={{
              scale: 1,
            }}
          >
            {EditIcon}
          </motion.div>

          <motion.div
            className="text-red-700 text-base"
            onClick={() => handleDelete("categories", category)}
            whileHover={{
              scale: 1.3,
            }}
            whileTap={{
              scale: 1,
            }}
          >
            {DeleteIcon}
          </motion.div>
        </div>
      </td>
    </motion.tr>,
    parents.map(
      (parent) =>
        parent.CategoryId === category.id && (
          <React.Fragment key={parent.id}>
            <Parent categoryId={category.id} parent={parent} />
          </React.Fragment>
        )
    ),
  ];
}
