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

  const [mainCategory, setMainCategory] = useState([]);
  const [mainParent, setMainParent] = useState([]);
  const [mainChild, setMainChild] = useState([]);
  const [mainItem, setMainItem] = useState([]);

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

    handleFilter(text);
  };

  // const handleFilter = (entry, searchText) => {
  //   let arr0, arr1, arr2, arr3, name;
  //   if (searchText !== "") {
  //     // switch (entry) {
  //     //   case "categories":
  //     //     arr1 = data[0].filter((category) =>
  //     //       category.name.toLowerCase().includes(searchText.toLowerCase())
  //     //     );
  //     //     setCategoryData(arr1);
  //     //   case "parents":
  //     //     arr2 = data[1].filter((parent) =>
  //     //       parent.name.toLowerCase().includes(searchText.toLowerCase())
  //     //     );
  //     //     setParentData(arr2);
  //     //   case "children":
  //     //     arr3 = data[2].filter((child) =>
  //     //       child.name.toLowerCase().includes(searchText.toLowerCase())
  //     //     );
  //     //     setChildData(arr3);
  //     //   case "items":
  //     //     arr4 = data[3].filter((item) =>
  //     //       item.name.toLowerCase().includes(searchText.toLowerCase())
  //     //     );
  //     //     setItemData(arr4);
  //     //   default:
  //     //     break;
  //     // }
  //     searchText = searchText.toLowerCase();

  //     switch (entry) {
  //       case "categories":
  //         arr0 = data[0].filter((category) => {
  //           name = category.name.toLowerCase();
  //           if (name.includes(searchText)) {
  //             return name;
  //           }
  //         });
  //         setCategoryData(arr0);
  //       case "parents":
  //         arr1 = data[1].filter((parent) => {
  //           name = parent.name.toLowerCase();
  //           if (name.includes(searchText)) {
  //             predecessor("parents", parent.CategoryId);
  //             return name;
  //           }
  //         });
  //         setParentData(arr1);
  //       case "children":
  //         arr2 = data[2].filter((child) => {
  //           name = child.name.toLowerCase();
  //           if (name.includes(searchText)) {
  //             predecessor("children", child.CategoryId, child.ParentId);
  //             return name;
  //           }
  //         });
  //         setChildData(arr2);

  //       case "items":
  //         arr3 = data[3].filter((item) => {
  //           name = item.name.toLowerCase();
  //           if (name.includes(searchText)) {
  //             predecessor(
  //               "items",
  //               item.CategoryId,
  //               item.ParentId,
  //               item.ChildId
  //             );
  //             return name;
  //           }
  //         });
  //         setItemData(arr3);
  //         break;

  //       default:
  //         break;
  //     }

  //     // console.log(categoryData);
  //   } else {
  //     initialize();
  //   }
  // };

  // Trying to show tree if child component is filtered from search
  // const predecessor = (entry, id0, id1 = null, id2 = null) => {
  //   let arr0, arr1, arr2;

  //   switch (entry) {
  //     case "items":
  //       arr0 = data[0].filter((category) => category.id === id0);
  //       arr1 = data[1].filter((parent) => parent.id === id1);
  //       arr2 = data[2].filter((child) => child.id === id2);
  //       break;
  //     case "children":
  //       arr0 = data[0].filter((category) => category.id === id0);
  //       arr1 = data[1].filter((parent) => parent.id === id1);
  //       break;
  //     case "parents":
  //       arr0 = data[0].filter((category) => category.id === id0);
  //       break;
  //   }

  //   if (arr0?.length > 0) {
  //     const foundCategory = arr0[0];
  //     const filteredCategory, setFilteredCategory = categoryData.find( = useS
  //       (category) => category.id === foundCategory.id
  //     );

  //     categoryData.map((category) =>
  //       console.log(category.id, "== ? ", foundCategory.id)
  //     );

  //     if (!filteredCategory, setFilteredCategory) { = useS
  //       setCategoryData((prev) => [...prev, foundCategory]);
  //     }  else {
  //       categoryData.map(category => category.id !==foundCategory.id)
  //     }
  //   }
  //   if (arr1?.length > 0) {
  //     const foundParent = arr1[0];
  //     const filteredParent = parentData.find(
  //       (parent) => parent.id === foundParent.id
  //     );
  //     if (!filteredParent) {
  //       setParentData((prev) => [...prev, foundParent]);
  //     } else {
  //       // foundParent = parentData.map(parent => parent.id !==foundParent.id)
  //     }
  //   }
  //   if (arr2?.length > 0) {
  //     const foundChild = arr2[0];
  //     const filteredChild = childData.find(
  //       (child) => child.id === foundChild.id
  //     );
  //     if (!filteredChild) {
  //       setChildData((prev) => [...prev, foundChild]);
  //     } else {
  //       categoryData.map(category => category.id !==foundCategory.id)
  //     }
  //   }
  // };

  const handleFilter = (searchText) => {
    // Search filter holders
    let arr0, arr1, arr2, arr3;

    // Predecessor holders
    let itemChild = [];
    let itemParent = [];
    let itemCategory = [];
    let childParent = [];
    let childCategory = [];
    let parentCategory = [];
    let Category = [];

    if (searchText !== "") {
      searchText = searchText.toLowerCase();

      // Search inside products array
      arr0 = searchData("categories", searchText);
      arr1 = searchData("parents", searchText);
      arr2 = searchData("children", searchText);
      arr3 = searchData("items", searchText);

      // Category filters
      let baseCatData = [...arr0];
      let baseParData = [...arr1];
      let baseChiData = [...arr2];
      let baseItemData = [...arr3];

      console.info("Categories");
      console.table(baseCatData);

      console.info("Parents");
      console.table(baseParData);

      console.info("Children");
      console.table(baseChiData);

      console.info("Items");
      console.table(baseItemData);

      // If category is found
      if (arr0?.length > 0) {
        Category = [...arr0];
      }

      // If parent is found
      if (arr1?.length > 0) {
        // setParentData((prev) => [...prev, arr1]);

        arr1.map((parent) => {
          arr0 = data[0].filter(
            (category) => category.id === parent.CategoryId
          );

          if (
            !parentCategory.find(
              (category) => category.id === parent.CategoryId
            )
          ) {
            parentCategory.push(arr0[0]);
          }
        });
      }

      // If child is found
      if (arr2?.length > 0) {
        // setChildData((prev) => [...prev, arr2]);

        arr2.map((child) => {
          arr1 = data[1].filter((parent) => parent.id === child.ParentId);
          arr0 = data[0].filter((category) => category.id === child.CategoryId);

          if (!childParent.find((parent) => parent.id === child.ParentId)) {
            childParent.push(arr1[0]);
          }
          if (
            !childCategory.find((category) => category.id === child.CategoryId)
          ) {
            childCategory.push(arr0[0]);
          }
        });
      }

      // If product is found
      if (arr3?.length > 0) {
        // setItemData((prev) => [...prev, arr3]);

        arr3.map((item) => {
          arr2 = data[2].filter((child) => child.id === item.ChildId);
          arr1 = data[1].filter((parent) => parent.id === item.ParentId);
          arr0 = data[0].filter((category) => category.id === item.CategoryId);

          if (!itemChild.find((child) => child.id === item.ChildId)) {
            itemChild.push(arr2[0]);
          }
          if (!itemParent.find((parent) => parent.id === item.ParentId)) {
            itemParent.push(arr1[0]);
          }
          if (
            !itemCategory.find((category) => category.id === item.CategoryId)
          ) {
            itemCategory.push(arr0[0]);
          }
        });
      }

      // Push collected category data to existing array
      itemCategory.map((item) => {
        const exist = Category.find((category) => category.id === item.id);
        if (!exist) baseCatData.push(item);
      });
      childCategory.map((child) => {
        const exist = baseCatData.find((category) => category.id === child.id);
        if (!exist) baseCatData.push(child);
      });
      parentCategory.map((parent) => {
        const exist = baseCatData.find((category) => category.id === parent.id);
        if (!exist) baseCatData.push(parent);
      });

      setCategoryData(baseCatData);

      // Push collected parent data to existing array
      itemParent.map((item) => {
        const exist = baseParData.find((parent) => parent.id === item.id);
        if (!exist) baseParData.push(item);
      });

      childParent.map((child) => {
        const exist = baseParData.find((parent) => parent.id === child.id);
        if (!exist) baseParData.push(child);
      });

      setParentData(baseParData);

      // Push collected child data to existing array
      itemChild.map((item) => {
        const exist = baseChiData.find((child) => child.id === item.id);
        if (!exist) baseChiData.push(item);
      });

      setChildData(baseChiData);

      // Push collected item data to existing array
    } else {
      initialize();
    }
  };

  const searchData = (entry, searchText) => {
    if (entry === "categories") {
      return data[0].filter((category) => {
        const name = category.name.toLowerCase();
        if (name.includes(searchText)) {
          return category;
        }
      });
    } else if (entry === "parents") {
      return data[1].filter((parent) => {
        const name = parent.name.toLowerCase();
        if (name.includes(searchText)) {
          return parent;
        }
      });
    } else if (entry === "children") {
      return data[2].filter((child) => {
        const name = child.name.toLowerCase();
        if (name.includes(searchText)) {
          return child;
        }
      });
    } else if (entry === "items") {
      return data[3].filter((item) => {
        const name = item.name.toLowerCase();
        if (name.includes(searchText)) {
          return item;
        }
      });
    }
  };

  const predecessor = (entry, id0, id1 = null, id2 = null) => {
    let arr0, arr1, arr2;

    switch (entry) {
      case "items":
        arr0 = data[0].filter((category) => category.id === id0);
        arr1 = data[1].filter((parent) => parent.id === id1);
        arr2 = data[2].filter((child) => child.id === id2);
        break;
      case "children":
        arr0 = data[0].filter((category) => category.id === id0);
        arr1 = data[1].filter((parent) => parent.id === id1);
        break;
      case "parents":
        arr0 = data[0].filter((category) => category.id === id0);
        break;
    }

    if (arr0?.length > 0) {
      const foundCategory = arr0[0];
      const filteredCategory = categoryData.find(
        (category) => category.id === foundCategory.id
      );

      // categoryData.map((category) =>
      // console.log(category.id, "== ? ", foundCategory.id)
      // );

      if (!filteredCategory) {
        setCategoryData((prev) => [...prev, foundCategory]);
      } else {
        categoryData.map((category) => category.id !== foundCategory.id);
      }
    }
    if (arr1?.length > 0) {
      const foundParent = arr1[0];
      const filteredParent = parentData.find(
        (parent) => parent.id === foundParent.id
      );
      if (!filteredParent) {
        setParentData((prev) => [...prev, foundParent]);
      } else {
        // foundParent = parentData.map(parent => parent.id !==foundParent.id)
      }
    }
    if (arr2?.length > 0) {
      const foundChild = arr2[0];
      const filteredChild = childData.find(
        (child) => child.id === foundChild.id
      );
      if (!filteredChild) {
        setChildData((prev) => [...prev, foundChild]);
      } else {
        categoryData.map((category) => category.id !== foundCategory.id);
      }
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
                  categoryData.map((category, index) => (
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
