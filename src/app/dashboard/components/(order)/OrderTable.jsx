import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  Suspense,
} from "react";

import Customer from "./orderData/Customer";
import RemoveModal from "./Remove";

import { useOrderDataContext } from "./Order";
import { setCookie, getCookie, hasCookie } from "cookies-next";
import { motion, AnimatePresence } from "framer-motion";

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
  const customers = order[0];

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

  useEffect(() => {
    if (hasCookie("Customer")) setCus(JSON.parse(getCookie("Customer")));
    else setCus();
  }, []);

  useEffect(() => {
    setCookie("Customer", cus);
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
      <div className="table-container bg-neutral-300 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
        <div className="mx-auto w-[95%] md:w-[75%] overflow-auto">
          <table className="table-fixed w-full text-sm">
            <thead className="border-b border-black">
              <tr className="">
                <th className="text-center md:text-start py-5 w-24">Name</th>
                <th className="text-center md:text-start py-5 w-24">
                  Phone No.
                </th>
                <th className="w-16" />
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
                  {customers.map((customer) =>
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
            className={`fixed top-0 bottom-0 right-0 left-0 z-10 bg-neutral-200/30 dark:bg-neutral-900/30 backdrop-blur-sm  flex ${
              removeModal ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <RemoveModal
              removeData={removeData}
              closeRemoveModal={closeRemoveModal}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </OrderContext.Provider>
  );
}
export const useOrderContext = () => useContext(OrderContext);
