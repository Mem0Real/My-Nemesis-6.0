"use client";

import React from "react";

import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material";
import { useDataContext } from "../List";

export default function Items({ category, parent, child }) {
  const { handleAdd, handleEdit, handleDelete, data } = useDataContext();
  const items = data[3];
  return (
    <>
      <Table size="medium" aria-label="items">
        <TableHead>
          <TableRow>
            <TableCell>
              <p className="font-bold px-16">Item Name</p>
            </TableCell>
            <TableCell>
              <p className="font-bold">Brand Name</p>
            </TableCell>
            <TableCell>
              <p className="font-bold">Model</p>
            </TableCell>
            <TableCell>
              <p className="font-bold">Quantity</p>
            </TableCell>
            <TableCell>
              <p className="font-bold">Price</p>
            </TableCell>
            <TableCell align="left">
              <p className="font-bold">Description</p>
            </TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => {
            return (
              item.ChildId === child.id && (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell>{item.brand}</TableCell>
                  <TableCell>{item.model}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell align="center">
                    <div className="flex justify-evenly items-center">
                      <button
                        name="add"
                        onClick={() => handleEdit("items", item)}
                        className="text-blue-500"
                      >
                        <EditOutlined />
                      </button>
                      <button
                        name="edit"
                        onClick={() => handleDelete("items", item)}
                        className="text-red-500"
                      >
                        <DeleteForeverOutlined />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            );
          })}
        </TableBody>
      </Table>
      <div className="flex flex-col w-full justify-center items-center md:mt-3">
        <Button
          name="delete"
          variant="contained"
          color="success"
          onClick={() => handleAdd("items", category.id, parent.id, child.id)}
          className="bg-green-700"
        >
          Add Item
        </Button>
      </div>
    </>
  );
}
