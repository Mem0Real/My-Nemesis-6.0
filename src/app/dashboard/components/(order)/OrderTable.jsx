import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  Suspense,
  useRef,
} from "react";

import Customer from "./orderData/Customer";
import RemoveModal from "./Remove";

import { useOrderDataContext } from "./Order";
import { setCookie, getCookie, hasCookie } from "cookies-next";
import { motion, AnimatePresence } from "framer-motion";
import { useIcons } from "@/app/utils/CustomIcons";

const OrderContext = createContext({});

export default function OrderTable() {
  const [cus, setCus] = useState({ id: null, open: false });

  const [removeLoading, setRemoveLoading] = useState({
    id: null,
    loading: false,
  });
  const [removeModal, showRemoveModal] = useState(false);
  const [removeData, setRemoveData] = useState();

  const { order, delivered } = useOrderDataContext();
  const { RightArrowIcon, NotDeliveredIcon } = useIcons();

  const removeRef = useRef();

  const [sortedData, setSortedData] = useState();
  const [sort, setSort] = useState("createdAt");
  const [asc, setAsc] = useState(true);

  // Update sort Data when initial data changes
  useEffect(() => {
    setSortedData(order[0]);
  }, [order[0]]);

  // If updated toggleSort
  useEffect(() => {
    if (sortedData === order[0]) {
      toggleSort(undefined, "initial");
    }
  }, [sortedData]);

  // Disable scrollbar on modal open
  useEffect(() => {
    const handleWindowWheel = (event) => {
      if (removeModal) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWindowWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWindowWheel);
    };
  }, [removeModal]);

  // Disable lenis scroll on modal open
  useEffect(() => {
    const html = document.querySelector("html");
    removeModal
      ? (html.dataset.lenisPrevent = "")
      : delete html.dataset.lenisPrevent;
  }, [removeModal]);

  // Close "Remove" modal on click outside
  useEffect(() => {
    let handler = (e) => {
      if (removeModal && !removeRef.current.contains(e.target)) {
        closeRemoveModal();
      }
    };
    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, [removeModal]);

  // Close remove modal on keypress "Esc"
  useEffect(() => {
    const esc = (e) => e.key === "Escape";

    const handler = (e) => {
      if (esc(e)) {
        closeRemoveModal();
      }
    };

    window.addEventListener("keyup", handler);

    return () => {
      window.removeEventListener("keyup", handler);
    };
  }, []);

  // Update Customer Cookie
  useEffect(() => {
    if (hasCookie("Customer")) setCus(JSON.parse(getCookie("Customer")));
  }, []);

  useEffect(() => {
    setCookie("Customer", cus);
  }, [cus]);

  useEffect(() => {
    handleSort();
  }, [sort, asc]);

  const toggleSort = (colName = null, initial = null) => {
    colName && setSort(colName);

    if (!initial) {
      sort !== colName ? setAsc(true) : setAsc(!asc);
    } else handleSort();
  };

  const handleSort = () => {
    let sorted;

    if (sortedData) {
      if (asc === true) {
        if (sort === "name") {
          sorted = [...sortedData].sort((a, b) => {
            if (a.id > b.id) return 1;
            if (a.id < b.id) return -1;
            return 0;
          });
        } else {
          sorted = [...sortedData].sort((a, b) => {
            if (a[sort] > b[sort]) return -1;
            if (a[sort] < b[sort]) return 1;
            return 0;
          });
        }
      } else {
        if (sort === "name") {
          sorted = [...sortedData].sort((a, b) => {
            if (a.id < b.id) return 1;
            if (a.id > b.id) return -1;
            return 0;
          });
        } else {
          sorted = [...sortedData].sort((a, b) => {
            if (a[sort] < b[sort]) return -1;
            if (a[sort] > b[sort]) return 1;
            return 0;
          });
        }
      }
      setSortedData(sorted);
    }
  };
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

  const handleRemove = (id) => {
    showRemoveModal(() => true);
    setRemoveData(() => ({ entry: "customers", id: id }));
  };

  const closeRemoveModal = () => {
    showRemoveModal(() => false);
  };

  const modalVariants = {
    open: {
      opacity: 1,
      display: "flex",
    },
    close: {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    },
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
    deliveredCheck: {
      color: "rgb(10 190 40)",
      opacity: 0.6,
    },
    notDeliveredCheck: {
      color: "rgb(21 128 61)",
      opacity: 1,
    },
    deliveredRemove: {
      color: "rgb(240 48 48)",
      opacity: 0.6,
      cursor: "not-allowed",
    },
    notDeliveredRemove: {
      color: "rgb(220 38 38)",
      opacity: 1,
      cursor: "pointer",
    },
  };
  const contentVariants = {
    open: {
      opacity: 1,
      y: "0px",
      transition: {
        duration: 0.2,
        ease: "linear",
        staggerChildren: 0.05,
        staggerDirection: 1,
      },
    },
    close: {
      opacity: 0,
      y: "-15px",
      transition: {
        duration: 0.2,
        ease: "linear",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <OrderContext.Provider
      value={{
        cus,
        setCus,
        customerDropDown,
        handleRemove,
        removeLoading,
        setRemoveLoading,
        contentVariants,
        buttonVariants,
      }}
    >
      <div className="table-container bg-transparent text-neutral-800 dark:text-neutral-200">
        <div className="mx-auto w-[95%] md:w-[85%] overflow-auto">
          <table className="table-fixed w-full text-sm">
            <thead className="border-b border-black">
              <tr className="">
                <th
                  className="text-center md:text-start py-5 w-44"
                  onClick={() => toggleSort("name")}
                >
                  <motion.div className="mr-auto w-fit cursor-pointer border px-2 py-1 border-neutral-500 rounded-md flex items-center gap-3">
                    <motion.span>Name</motion.span>
                    <motion.span
                      className="text-neutral-800 dark:text-neutral-200"
                      initial={{ rotate: -90 }}
                      animate={
                        sort === "name" && asc
                          ? { rotate: 90 }
                          : { rotate: -90 }
                      }
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {RightArrowIcon}
                    </motion.span>
                  </motion.div>
                </th>
                <th className="text-center md:text-start py-5 w-32">
                  <div className="mr-auto w-fit border px-2 py-1 border-neutral-500 rounded-md ">
                    Phone No.
                  </div>
                </th>
                <th
                  className="text-center py-5 w-36"
                  onClick={() => toggleSort("createdAt")}
                >
                  <motion.div className="mx-auto w-fit cursor-pointer border px-2 py-1 border-neutral-500 rounded-md flex items-center gap-3">
                    <motion.span>Order Date</motion.span>
                    <motion.span
                      className="text-neutral-800 dark:text-neutral-200"
                      initial={{ rotate: -90 }}
                      animate={
                        sort === "createdAt" && asc
                          ? { rotate: 90 }
                          : { rotate: -90 }
                      }
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {RightArrowIcon}
                    </motion.span>
                  </motion.div>
                </th>
                <th
                  className="text-center w-24"
                  onClick={() => toggleSort("delivered")}
                >
                  <motion.div
                    className="mx-auto w-fit cursor-pointer border px-2 border-neutral-500 rounded-md flex items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={delivered ? { opacity: 1 } : { opacity: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.span className="text-neutral-400 dark:text-neutral-600 px-2 py-1">
                      {NotDeliveredIcon}
                    </motion.span>
                    <motion.span
                      className="text-neutral-800 dark:text-neutral-200"
                      initial={{ rotate: -90 }}
                      animate={
                        sort === "delivered" && asc
                          ? { rotate: 90 }
                          : { rotate: -90 }
                      }
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {RightArrowIcon}
                    </motion.span>
                  </motion.div>
                </th>
              </tr>
            </thead>
            <motion.tbody
              className="bg-neutral-300 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
              layout="position"
            >
              <Suspense
                fallback={
                  <h1 className="text-4xl bg-neutral-300 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 mx-auto">
                    Loading...
                  </h1>
                }
              >
                <AnimatePresence key="customerRow">
                  {sortedData?.map((customer) =>
                    delivered ? (
                      <React.Fragment key={customer.id}>
                        <Customer customer={customer} />
                      </React.Fragment>
                    ) : (
                      customer.delivered === false && (
                        <React.Fragment key={customer.id}>
                          <Customer customer={customer} />
                        </React.Fragment>
                      )
                    )
                  )}
                </AnimatePresence>
              </Suspense>
            </motion.tbody>
          </table>
        </div>
      </div>
      <AnimatePresence className="my-3">
        {removeModal && (
          <motion.div
            key="innerRemoveM"
            initial={"close"}
            animate={removeModal ? "open" : "close"}
            variants={modalVariants}
            exit={"close"}
            className={`fixed top-0 bottom-0 right-0 left-0 z-40 bg-neutral-200/30 dark:bg-neutral-900/30 backdrop-blur-sm  flex ${
              removeModal ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <RemoveModal
              removeData={removeData}
              closeRemoveModal={closeRemoveModal}
              removeRef={removeRef}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </OrderContext.Provider>
  );
}
export const useOrderContext = () => useContext(OrderContext);
