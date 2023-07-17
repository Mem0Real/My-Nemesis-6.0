"use client";

import React, { useState } from "react";
import { useDataContext } from "./List";
import ChildRow from "./ChildRow";
import { RightOutlined } from "@ant-design/icons";
import { AnimatePresence, motion } from "framer-motion";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

function capitalize(str) {
  return str
    .split(" ")
    .map((s) => {
      return s.charAt(0).toUpperCase() + s.substr(1);
    })
    .join(" ");
}

export default function ParentRow({ parent, expandedParent }) {
  const [expanded, setExpanded] = useState(false);

  const { data } = useDataContext();

  const children = data[2];

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
    <AnimatePresence key={parent.id}>
      {expandedParent && (
        <motion.tr
          key={parent.id}
          animate={expandedParent ? "open" : "closed"}
          variants={variants}
          exit={"closed"}
          className={`hover:border-b border-neutral-500 cursor-pointer ${
            expanded && "border-b-2 hover:border-b-2 border-neutral-600"
          }`}
        >
          <td className="pl-3 py-4" onClick={toggleExpander}>
            <div className="list-outside flex items-center gap-3">
              <RightOutlined
                className={`text-sm transition-all ease-in-out duration-500 text-neutral-800 hover:text-neutral-950 ${
                  expanded ? "rotate-90 translate-x-0.5 translate-y-0.5" : ""
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

    expanded &&
      children.map(
        (child) =>
          child.ParentId === parent.id && (
            <React.Fragment key={child.id}>
              <ChildRow child={child} expandedChild={expanded} />
            </React.Fragment>
          )
      ),
  ];
}
