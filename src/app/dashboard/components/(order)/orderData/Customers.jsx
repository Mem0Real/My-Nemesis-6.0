"use client";

import React from "react";
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
import { useOrderDataContext } from "../Order";

const Orders = dynamic(() => import("./Orders"));

import { useOrderContext } from "../OrderTable";

export default function Customers() {
  const { order } = useOrderDataContext();
  const { customerDropDown, cus } = useOrderContext();

  const customers = order[0];
  return customers.map((customer, index) => (
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
            <button>
              <Check variant="contained" color="success" />
            </button>

            <button>
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
  ));
}
