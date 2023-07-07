"use client";

import React, { useState } from "react";
import { Suspense } from "react";
import dynamic from "next/dynamic";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Check, Remove } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Orders = dynamic(() => import("./Orders"));

import { useOrderDataContext } from "../Order";
import { useOrderContext } from "../OrderTable";
import AlertDialog from "../AlertDialog";

export default function Customers() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [removeData, setRemoveData] = useState();

  const { order, delivered, markDelivered } = useOrderDataContext();
  const { customerDropDown, cus } = useOrderContext();

  const customers = order[0];
  let newArr = [];
  delivered
    ? (newArr = customers)
    : (newArr = customers.filter((customer) => customer.delivered === false));

  let newArray = customers.map((customer) => {
    if (customer.delivered === true) {
      return { ...customer, id: customer.id, delivered: true };
    }
  });
  const handleDialogOpen = (id) => {
    setDialogOpen(true);
    setRemoveData(() => ({ entry: "customers", id: id }));
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      {newArr.map((customer, index) => (
        <React.Fragment key={customer.id}>
          <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => customerDropDown(customer.id)}
              >
                {cus.id === customer.id && cus.open ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </TableCell>
            <TableCell>{customer.name}</TableCell>
            <TableCell>+251 {customer.phone}</TableCell>

            {/* Buttons */}
            <TableCell align="center" colSpan={5}>
              <div className="flex items-center gap-2">
                <button
                  disabled={customer.delivered === true}
                  className="text-green-600 disabled:text-green-300 disabled:border-3 rounded-lg hover:bg-neutral-700 disabled:hover:bg-transparent px-1 py-1"
                  onClick={() => markDelivered("customers", customer.id)}
                >
                  <Check variant="contained" />
                </button>

                <button onClick={() => handleDialogOpen(customer.id)}>
                  <Remove variant="contained" color="error" />
                </button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse
                in={cus.id === customer.id && cus.open === true}
                timeout="auto"
                unmountOnExit
              >
                <Box sx={{ margin: 1 }}>
                  <Suspense fallback={<h1>Loading...</h1>}>
                    <Orders customerId={customer.id} />
                  </Suspense>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      ))}
      <AlertDialog
        data={removeData}
        open={dialogOpen}
        handleClose={handleDialogClose}
      />
    </>
  );
}
