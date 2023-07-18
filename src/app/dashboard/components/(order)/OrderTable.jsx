"use client";

import {
  useState,
  useEffect,
  Suspense,
  createContext,
  useContext,
} from "react";
import dynamic from "next/dynamic";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Customers = dynamic(() => import("./orderData/Customers"));

const OrderContext = createContext({});

export default function OrderTable() {
  const [cus, setCus] = useState({});

  useEffect(() => {
    const data = window.localStorage.getItem("Customer");
    if (data !== null) setCus(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("Customer", JSON.stringify(cus));
  }, [cus]);

  const customerDropDown = (customerId) => {
    if (!cus.id) {
      setCus({ id: customerId, open: true });
    } else {
      if (cus.id === customerId) {
        setCus({ ...cus, open: !cus.open });
      } else {
        setCus({ id: cus.id, open: false });
        setCus({ id: customerId, open: true });
      }
    }
  };

  return (
    <OrderContext.Provider
      value={{
        cus,
        setCus,
        customerDropDown,
      }}
    >
      <Paper
        sx={{ width: "90%", overflow: "hidden", marginX: "auto" }}
        elevation={0}
      >
        <TableContainer component={Paper}>
          <Table
            aria-label="Orders Table"
            size="small"
            className="bg-neutral-300"
          >
            <TableHead elevation={1}>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <h1 className="text-md font-semibold">Name</h1>
                </TableCell>
                <TableCell>
                  <h1 className="text-md font-semibold">Phone</h1>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <Suspense fallback={<h1>Loading...</h1>}>
                <Customers />
              </Suspense>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </OrderContext.Provider>
  );
}
export const useOrderContext = () => useContext(OrderContext);
