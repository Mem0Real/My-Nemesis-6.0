"use client";

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  Suspense,
} from "react";
import dynamic from "next/dynamic";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Categories = dynamic(() => import("./listData/Categories"));

const ListContext = createContext({});

export default function ListTable() {
  const [cat, setCat] = useState({});
  const [par, setPar] = useState({});
  const [chi, setChi] = useState({});

  useEffect(() => {
    const data = window.localStorage.getItem("CATEGORY");
    if (data !== null) setCat(JSON.parse(data));
  }, []);

  useEffect(() => {
    const data = window.localStorage.getItem("PARENT");
    if (data !== null) setPar(JSON.parse(data));
  }, []);

  useEffect(() => {
    const data = window.localStorage.getItem("CHILD");
    if (data !== null) setChi(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("CATEGORY", JSON.stringify(cat));
  }, [cat]);

  useEffect(() => {
    window.localStorage.setItem("PARENT", JSON.stringify(par));
  }, [par]);

  useEffect(() => {
    window.localStorage.setItem("CHILD", JSON.stringify(chi));
  }, [chi]);

  const catDropDown = (categoryId) => {
    if (!cat.id) {
      setCat({ id: categoryId, open: true });
    } else {
      if (cat.id === categoryId) {
        setCat({ ...cat, open: !cat.open });
        if (cat.open === true) {
          setPar({ ...par, open: false });
          setChi({ ...chi, open: false });
        }
      } else {
        setCat({ id: cat.id, open: false });
        setCat({ id: categoryId, open: true });
      }
    }
  };

  const parDropDown = (parentId) => {
    !par.id
      ? setPar({ id: parentId, open: true })
      : par.id === parentId && setPar({ ...par, open: !par.open });

    if (!par.id) {
      setPar({ id: parentId, open: true });
    } else {
      if (par.id === parentId) {
        setPar({ ...par, open: !par.open });
        if (par.open === true) {
          setChi({ ...chi, open: false });
        }
      } else {
        setPar({ id: par.id, open: false });
        setPar({ id: parentId, open: true });
      }
    }
  };

  const childDropDown = (childId) => {
    !chi.id
      ? setChi({ id: childId, open: true })
      : chi.id === childId && setChi({ ...chi, open: !chi.open });

    if (!chi.id) {
      setChi({ id: childId, open: true });
    } else {
      if (chi.id === childId) {
        setChi({ ...chi, open: !chi.open });
      } else {
        setChi({ id: chi.id, open: false });
        setChi({ id: childId, open: true });
      }
    }
  };

  return (
    <ListContext.Provider
      value={{
        catDropDown,
        parDropDown,
        childDropDown,
        cat,
        par,
        chi,
        setCat,
        setPar,
        setChi,
      }}
    >
      <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={0}>
        <TableContainer component={Paper}>
          <Table
            aria-label="Categories Table"
            size="large"
            className="bg-neutral-200"
          >
            <TableHead elevation={1}>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <h1 className="text-md font-semibold">Name</h1>
                </TableCell>
                <TableCell>
                  <h1 className="text-md font-semibold">Description</h1>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <Suspense fallback={<h1>Loading...</h1>}>
                <Categories />
              </Suspense>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </ListContext.Provider>
  );
}

export const useListContext = () => useContext(ListContext);