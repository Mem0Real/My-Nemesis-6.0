"use client";

import React, { useState } from "react";
import { useDataContext } from "./List";
import ParentRow from "./ParentRow";
import { RightOutlined } from "@ant-design/icons";

import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

function capitalize(str) {
  return str
    .split(" ")
    .map((s) => {
      return s.charAt(0).toUpperCase() + s.substr(1);
    })
    .join(" ");
}

export default function CategoryRow({ category, index }) {
  const [expanded, setExpanded] = useState(false);

  const { data } = useDataContext();

  const parents = data[1];

  const toggleExpander = () => {
    setExpanded((prev) => !prev);
  };

  return [
    <tr
      key={category.id}
      className={`hover:border-b border-neutral-500 cursor-pointer ${
        expanded && "border-b-2 hover:border-b-2 border-neutral-700"
      }`}
    >
      <td className="py-4" onClick={toggleExpander}>
        <div className="list-outside flex items-center gap-3 transition-all ease-in-out duration-300">
          <RightOutlined
            className={`text-sm transition-all ease-in-out duration-500 text-neutral-800 hover:text-neutral-950 ${
              expanded ? "rotate-90 translate-x-0.5 translate-y-0.5" : ""
            }`}
          />
          {capitalize(category.name)}
        </div>
      </td>
      <td className="py-4 max-w-36" onClick={toggleExpander}>
        {category.description}
      </td>
      <td>
        <div className="flex items-center gap-3 px-6">
          <PlusOutlined className="text-green-700" />
          <EditOutlined className="text-blue-700" />
          <DeleteOutlined className="text-red-700" />
        </div>
      </td>
    </tr>,
    parents.map(
      (parent) =>
        parent.CategoryId === category.id && (
          <React.Fragment key={parent.id}>
            <ParentRow parent={parent} expandedParent={expanded} />
          </React.Fragment>
        )
    ),
  ];
}
