"use client";

import React from "react";
import Link from "next/link";

import { useDataContext } from "../List";
import { useTableContext } from "../ListTable";

import Child from "./Child";

import { AnimatePresence, motion } from "framer-motion";

import { useIcons } from "@/app/utils/CustomIcons";

export default function Parent({ categoryId, parent }) {
  const { data, handleAdd, handleEdit, handleDelete } = useDataContext();

  const { cat, parDropDown, par } = useTableContext();

  const children = data[2];

  const { RightArrowIcon, PlusIcon, EditIcon, DeleteIcon } = useIcons();

  const toggleExpander = (e) => {
    parDropDown(parent.id);
  };

  const variants = {
    open: {
      opacity: 1,
    },
    close: {
      opacity: 0,
    },
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
    <AnimatePresence key={parent.id}>
      {cat.id === categoryId && cat.open === true && (
        <motion.tr
          animate={
            cat.id === categoryId && cat.open === true ? "open" : "close"
          }
          variants={variants}
          exit={"close"}
          className={`cursor-pointer bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600 ${
            par.id === parent.id && par.open === true && "font-semibold"
          }`}
        >
          <td className="py-3" onClick={toggleExpander}>
            <div className="list-outside flex items-center gap-3">
              <motion.div
                className={`text-sm text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 hover:dark:text-neutral-400 `}
                initial="close"
                animate={
                  par.id === parent.id && par.open === true ? "open" : "close"
                }
                exit="close"
                variants={buttonVariants}
              >
                {RightArrowIcon}
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }}>
                <Link
                  className="hover:underline underline-offset-4 z-10"
                  href={`collection/${categoryId}/${parent.id}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {parent.name}
                </Link>
              </motion.div>
            </div>
          </td>
          <td
            className="px-3 py-4 text-center md:text-start"
            onClick={toggleExpander}
          >
            {parent.description}
          </td>
          <td>
            <div className="flex items-center justify-center gap-3">
              <motion.div
                className="text-green-700 text-base"
                onClick={() => handleAdd("children", categoryId, parent.id)}
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
                onClick={() => handleEdit("parents", parent)}
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
                onClick={() => handleDelete("parents", parent)}
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

    children.map(
      (child) =>
        child.ParentId === parent.id && (
          <React.Fragment key={child.id}>
            <Child categoryId={categoryId} parentId={parent.id} child={child} />
          </React.Fragment>
        )
    ),
  ];
}
