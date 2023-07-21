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
import { setCookie, parseCookies } from "nookies";
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

  const cookieStore = parseCookies();

  useEffect(() => {
    let data;
    if (cookieStore.Customer && cookieStore.Customer !== "undefined") {
      data = JSON.parse(cookieStore.Customer);
      setCus(() => data);
    }
  }, []);

  useEffect(() => {
    setCookie(null, "Customer", JSON.stringify(cus));
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

  const variants = {
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

  return (
    <OrderContext.Provider
      value={{
        cus,
        setCus,
        customerDropDown,
        handleRemove,
        removeLoading,
        setRemoveLoading,
      }}
    >
      <div className="table-container text-neutral-800">
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
            <tbody>
              <Suspense
                fallback={
                  <h1 className="text-4xl text-neutral-800 bg-neutral-300 mx-auto">
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
            </tbody>
          </table>
        </div>
      </div>
      <AnimatePresence id="removeM" className="my-3">
        {removeModal && (
          <motion.div
            key="innerRemoveM"
            initial={"close"}
            animate={removeModal ? "open" : "close"}
            variants={variants}
            exit={"close"}
            className={`fixed top-0 bottom-0 right-0 left-0 z-10 bg-black/50 backdrop-blur-sm  flex ${
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
