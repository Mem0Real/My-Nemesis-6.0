"use client";

import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useOrderDataContext } from "../Order";

export default function Orders({ customerId }) {
  const { order } = useOrderDataContext();

  const orders = order[1];

  const subTotal = () => {
    let allPrice = orders.map((items) => {
      return parseFloat(items.productPrice);
    });
    allPrice = allPrice.reduce((sum, i) => sum + i, 0);
    return allPrice.toFixed(2);
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  let totalPrice = subTotal();
  totalPrice = formatter.format(totalPrice);
  return (
    <Paper
      sx={{
        width: "90%",
        overflow: "hidden",
        marginX: "auto",
      }}
      elevation={0}
    >
      <TableContainer
        component={Paper}
        className="bg-neutral-200 border-b-2 border-neutral-700"
      >
        <Table size="small" aria-label="orders">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                className="underline underline-offset-2"
              >
                <p className="font-bold">Product Name</p>
              </TableCell>
              <TableCell
                align="center"
                className="underline underline-offset-2"
              >
                <p className="font-bold">Ordered Amount</p>
              </TableCell>
              <TableCell
                align="center"
                className="underline underline-offset-2"
              >
                <p className="font-bold">Product Price</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(
              (order) =>
                order.customerId == customerId && (
                  <React.Fragment key={order.id}>
                    <TableRow>
                      <TableCell component="th" scope="row" align="center">
                        {order.productName}
                      </TableCell>
                      <TableCell align="center">
                        {order.orderedQuantity}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="flex gap-2 items-center justify-center"
                      >
                        {formatter.format(
                          parseFloat(order.productPrice).toFixed(2)
                        )}
                        <span className="text-xs italic text-neutral-500">
                          ETB
                        </span>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                )
            )}
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell
                align="left"
                className="pt-6 align-baseline border-t-1 border-b-0 border-neutral-800 flex gap-2 items-center justify-center"
              >
                Total Price: {totalPrice}
                <span className="text-xs italic text-neutral-500">ETB</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
