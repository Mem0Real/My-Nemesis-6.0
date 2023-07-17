"use client";

import React from "react";
import Link from "next/link";

import ParentRow from "./ParentRow";

import { useDataContext } from "./List";
import { useTableContext } from "./MyTable";

import {
  RightOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

export default function CategoryRow({ category }) {
  const { data, handleAdd, handleEdit, handleDelete } = useDataContext();
  const { catDropDown, cat } = useTableContext();

  const parents = data[1];

  const toggleExpander = () => {
    catDropDown(category.id);
  };

  return [
    <tr
      key={category.id}
      className={`hover:border-b border-neutral-500 cursor-pointer ${
        cat.id === category.id && cat.open === true && "font-semibold"
      }`}
    >
      <td className="py-2">
        <div
          className="list-outside flex items-center gap-3 transition-all ease-in-out duration-300"
          onClick={toggleExpander}
        >
          <RightOutlined
            className={`text-sm transition-all ease-in-out duration-500 text-neutral-800 hover:text-neutral-950 ${
              cat.id === category.id && cat.open === true
                ? "rotate-90 translate-x-0.5 translate-y-0.5"
                : ""
            }`}
          />
          <Link
            className="hover:underline underline-offset-4 z-10"
            href={`collection/${category.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            {category.name}
          </Link>
        </div>
      </td>
      <td
        className="py-4 max-w-36 text-center md:text-start"
        onClick={toggleExpander}
      >
        {category.description}
      </td>
      <td>
        <div className="flex items-center gap-3">
          <PlusOutlined
            className="text-green-700"
            onClick={() => handleAdd("parents", category.id)}
          />
          <EditOutlined
            className="text-blue-700"
            onClick={() => handleEdit("categories", category)}
          />
          <DeleteOutlined
            className="text-red-700"
            onClick={() => handleDelete("categories", category)}
          />
        </div>
      </td>
    </tr>,
    parents.map(
      (parent) =>
        parent.CategoryId === category.id && (
          <React.Fragment key={parent.id}>
            <ParentRow categoryId={category.id} parent={parent} />
          </React.Fragment>
        )
    ),
  ];
}
