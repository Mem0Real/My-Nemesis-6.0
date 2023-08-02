import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  Suspense,
} from "react";

import { useDataContext } from "./List";
import Category from "./listData/Category";

import { setCookie, getCookie, hasCookie } from "cookies-next";

const TableContext = createContext({});

// TODO if entry is empty show empty data or smtn
export default function MyTable() {
  const { data } = useDataContext();

  const categories = data[0];

  const [cat, setCat] = useState({});
  const [par, setPar] = useState({});
  const [chi, setChi] = useState({});

  // const cookieStore = parseCookies();

  useEffect(() => {
    let category, parent, child;
    if (hasCookie("Category_Drop")) {
      category = JSON.parse(getCookie("Category_Drop"));
      setCat(category);
    } else setCat();

    if (hasCookie("Parent_Drop")) {
      parent = JSON.parse(getCookie("Parent_Drop"));
      setPar(parent);
    } else setPar();

    if (hasCookie("Child_Drop")) {
      child = JSON.parse(getCookie("Child_Drop"));
      setChi(child);
    } else setChi();
  }, []);

  useEffect(() => {
    setCookie("Category_Drop", cat);
    setCookie("Parent_Drop", par);
    setCookie("Child_Drop", chi);
  }, [cat, par, chi]);

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
        setPar({ ...par, open: false });
        setChi({ ...chi, open: false });
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
        setChi({ ...chi, open: false });
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

  const toggleCatDrop = (id) => {
    catDropDown(id);
  };

  const toggleParDrop = (id) => {
    parDropDown(id);
  };

  const toggleChiDrop = (id) => {
    childDropDown(id);
  };
  const buttonVariants = {
    open: {
      rotate: 90,
      x: 0.5,
      y: 0.5,
    },
    close: {
      rotate: 0,
      x: 0,
      y: 0,
    },
  };
  const dropVariants = {
    opened: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: 1,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };
  const contentVariants = {
    open: {
      opacity: 1,
      y: "0px",
      transition: {
        duration: 0.2,
        ease: "linear",
      },
    },
    close: {
      opacity: 0,
      y: "-25px",
      transition: {
        duration: 0.2,
        ease: "linear",
      },
    },
  };
  return (
    <TableContext.Provider
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
        toggleCatDrop,
        toggleParDrop,
        toggleChiDrop,
        buttonVariants,
        dropVariants,
        contentVariants,
      }}
    >
      <div className="table-container">
        <div className="mx-auto w-[98%] overflow-auto">
          <table className="table-fixed w-full text-sm">
            <thead className="border-b border-black dark:border-white">
              <tr className="">
                <th className="text-center md:text-start py-5 w-56 md:w-72 lg:w-96">
                  Name
                </th>
                <th className="text-center md:text-start py-5 w-80 md:w-80 lg:w-96">
                  Description
                </th>
                <th className="w-20 md:w-24 lg:w-36" />
              </tr>
            </thead>
            <tbody>
              <Suspense
                fallback={
                  <h1 className="text-4xl text-neutral-800 dark:text-neutral-200 mx-auto">
                    Loading...
                  </h1>
                }
              >
                {categories.map((category, index) => (
                  <React.Fragment key={category.id}>
                    <Category category={category} index={index} />
                  </React.Fragment>
                ))}
              </Suspense>
            </tbody>
          </table>
        </div>
      </div>
    </TableContext.Provider>
  );
}

export const useTableContext = () => useContext(TableContext);
