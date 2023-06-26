"use client";

import React from "react";
import dynamic from "next/dynamic";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {
  AddOutlined,
  DeleteForeverOutlined,
  EditOutlined,
} from "@mui/icons-material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useDataContext } from "../List";
const Parents = dynamic(() => import("./Parents"));

import { useListContext } from "../ListTable";

export default function Categories() {
  const { handleAdd, handleEdit, handleDelete, data } = useDataContext();
  const { catDropDown, cat } = useListContext();

  const categories = data[0].sort((a, b) => {
    const name1 = a.name.toUpperCase();
    const name2 = b.name.toUpperCase();

    if (name1 < name2) return -1;
    else if (name1 > name2) return 1;
    else return 0;
  });

  return categories.map((category, index) => (
    <React.Fragment key={category.id}>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => catDropDown(category.id)}
          >
            {cat.id === category.id && cat.open ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell>{category.name}</TableCell>
        <TableCell>{category.description}</TableCell>
        {/* Buttons */}
        <TableCell align="center" colSpan={5}>
          <div className="flex justify-evenly items-center">
            <button
              name="add"
              onClick={() => handleAdd("parents", category.id)}
              className="text-green-500"
            >
              <AddOutlined />
            </button>
            <button
              name="edit"
              onClick={() => handleEdit("categories", category)}
              className="text-blue-500"
            >
              <EditOutlined />
            </button>
            <button
              name="delete"
              onClick={() => handleDelete("categories", category)}
              className="text-red-500"
            >
              <DeleteForeverOutlined />
            </button>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse
            in={cat.id === category.id && cat.open === true}
            timeout="auto"
            unmountOnExit
          >
            <Box sx={{ margin: 1 }}>
              <Parents category={category} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  ));
}
