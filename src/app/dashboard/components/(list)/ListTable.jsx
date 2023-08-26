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
import { useIcons } from "@/app/utils/CustomIcons";

const TableContext = createContext({});

// TODO if entry is empty show empty data or smtn
export default function MyTable() {
  const { data } = useDataContext();

  const [categoryData, setCategoryData] = useState(data[0]);
  const [parentData, setParentData] = useState(data[1]);
  const [childData, setChildData] = useState(data[2]);
  const [itemData, setItemData] = useState(data[3]);

  const [empty, setEmpty] = useState(false);

  const [cat, setCat] = useState({});
  const [par, setPar] = useState({});
  const [chi, setChi] = useState({});

  const { SearchIcon } = useIcons();

  const initialize = () => {
    setCategoryData(data[0]);
    setParentData(data[1]);
    setChildData(data[2]);
    setItemData(data[3]);
  };

  useEffect(() => {
    let category, parent, child;
    if (hasCookie("Category_Drop")) {
      category = JSON.parse(getCookie("Category_Drop"));
      setCat(category);
    } else setCat({ id: false, open: false });

    if (hasCookie("Parent_Drop")) {
      parent = JSON.parse(getCookie("Parent_Drop"));
      setPar(parent);
    } else setPar({ id: false, open: false });

    if (hasCookie("Child_Drop")) {
      child = JSON.parse(getCookie("Child_Drop"));
      setChi(child);
    } else setChi({ id: false, open: false });
  }, []);

  useEffect(() => {
    setCookie("Category_Drop", cat);
    setCookie("Parent_Drop", par);
    setCookie("Child_Drop", chi);
  }, [cat, par, chi]);

  let content;

  const handleChange = (e, entry) => {
    const text = e.target.value;

    handleFilter(entry, text);
  };

  const handleFilter = (entry, searchText) => {
    let arr1, arr2, arr3, arr4;
    if (searchText !== "") {
      switch (entry) {
        case "categories":
          arr1 = data[0].filter((category) =>
            category.name.toLowerCase().includes(searchText.toLowerCase())
          );
          setCategoryData(arr1);
        case "parents":
          arr2 = data[1].filter((parent) =>
            parent.name.toLowerCase().includes(searchText.toLowerCase())
          );
          setParentData(arr2);
        case "children":
          arr3 = data[2].filter((child) =>
            child.name.toLowerCase().includes(searchText.toLowerCase())
          );
          setChildData(arr3);
        case "items":
          arr4 = data[3].filter((item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
          );
          setItemData(arr4);
        default:
          break;
      }
    } else {
      initialize();
    }
  };

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
        parentData,
        childData,
        itemData,
      }}
    >
      <div className="table-container">
        <div className="mx-auto w-[98%] overflow-auto">
          <div className="relative">
            <input
              type="search"
              onChange={(e) => handleChange(e, "categories")}
              placeholder="Search..."
              className="w-44 lg:w-48 flex-initial flex items-center cursor-pointer justify-evenly py-1 rounded-md outline outline-1 hover:outline-2outline-neutral-800 text-zinc-800 bg-zinc-200 dark:outline-neutral-200 dark:text-zinc-200 dark:bg-zinc-800"
            />
            <div className="text-base absolute left-1 lg:left-3 top-0 bottom-0 grid place-content-center z-10 text-neutral-800 dark:text-neutral-200">
              {SearchIcon}
            </div>
          </div>
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
                {categoryData.length > 0 ? (
                  categoryData?.map((category, index) => (
                    <React.Fragment key={category.id}>
                      <Category category={category} index={index} />
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} rowSpan={3} align="center">
                      <h1 className="py-12 text-2xl text-neutral-800 dark:text-neutral-200 mx-auto">
                        Not found
                      </h1>
                    </td>
                  </tr>
                )}
              </Suspense>
            </tbody>
          </table>
        </div>
      </div>
    </TableContext.Provider>
  );
}

export const useTableContext = () => useContext(TableContext);
