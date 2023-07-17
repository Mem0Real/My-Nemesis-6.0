"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  AddOutlined,
  DeleteForeverOutlined,
  EditOutlined,
} from "@mui/icons-material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Items = dynamic(() => import("./Items"));

import { useDataContext } from "../List";
import { useListContext } from "../ListTable";

export default function Children({ category, parent }) {
  const { handleAdd, handleEdit, handleDelete, data } = useDataContext();
  const { childDropDown, chi } = useListContext();

  const children = data[2];

  return (
    <Table size="large" aria-label="children">
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>
            <p className="font-bold">Child Name</p>
          </TableCell>
          <TableCell align="left">
            <p className="font-bold">Description</p>
          </TableCell>
          <TableCell align="center"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {children.map(
          (child) =>
            child.ParentId == parent.id && (
              <React.Fragment key={child.id}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => childDropDown(child.id)}
                    >
                      {chi.id === child.id && chi.open ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {child.name}
                  </TableCell>
                  <TableCell>{child.description}</TableCell>
                  <TableCell align="center">
                    <div className="flex justify-evenly items-center">
                      <button
                        name="add"
                        className="text-green-500"
                        onClick={() =>
                          handleAdd("items", category.id, parent.id, child.id)
                        }
                      >
                        <AddOutlined />
                      </button>
                      <button
                        name="edit"
                        onClick={() => handleEdit("children", child)}
                        className="text-blue-500"
                      >
                        <EditOutlined />
                      </button>
                      <button
                        name="delete"
                        onClick={() => handleDelete("children", child)}
                        className="text-red-500"
                      >
                        <DeleteForeverOutlined />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{
                      paddingBottom: 0,
                      paddingTop: 0,
                    }}
                    colSpan={6}
                  >
                    <Collapse
                      in={chi.id === child.id && chi.open === true}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box
                        sx={{
                          margin: 1,
                        }}
                      >
                        <Suspense fallback={<h1>Loading...</h1>}>
                          <Items
                            category={category}
                            parent={parent}
                            child={child}
                          />
                        </Suspense>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            )
        )}
      </TableBody>
    </Table>
  );
}
