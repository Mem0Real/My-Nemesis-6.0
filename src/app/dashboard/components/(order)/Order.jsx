"use client";

import {
  useState,
  useEffect,
  Suspense,
  createContext,
  useContext,
} from "react";
import dynamic from "next/dynamic";

import OrderTable from "./OrderTable";
const RemoveAllModal = dynamic(() => import("./RemoveAll"));

const OrderDataContext = createContext({});

import { motion, AnimatePresence } from "framer-motion";
import { setCookie, parseCookies } from "nookies";

export default function Order({
  order,
  url,
  removeOne,
  removeAll,
  markDelivered,
}) {
  const [delivered, showDelivered] = useState(false);

  const [removeAllModal, showRemoveAllModal] = useState(false);
  const [removeAllData, setRemoveAllData] = useState({});

  const cookieStore = parseCookies();

  useEffect(() => {
    if (removeAllModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [removeAllModal]);

  useEffect(() => {
    let data;
    if (cookieStore.Delivered && cookieStore.Delivered !== undefined)
      data = JSON.parse(cookieStore.Delivered);
    showDelivered(() => data);
  }, []);

  useEffect(() => {
    setCookie(null, "Delivered", JSON.stringify(delivered));
  }, [delivered]);

  const toggleDelivered = () => {
    showDelivered(!delivered);
  };

  const handleRemoveAll = (entry) => {
    showRemoveAllModal(() => true);
    setRemoveAllData(() => entry);
  };

  const closeRemoveAllModal = () => {
    showRemoveAllModal(() => false);
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
    <OrderDataContext.Provider
      value={{ order, url, delivered, markDelivered, removeOne }}
    >
      <div className="flex-flex-col w-full items-center justify-center relative min-h-screen bg-neutral-300 text-neutral-900 md:mt-6">
        <h1 className="text-2xl font-mono font-thin mt-2 underline underline-offset-4 text-center">
          Order list
        </h1>
        <div className="md:mt-6 md:pb-5 min-h-screen bg-neutral-300">
          <Suspense
            fallback={
              <h1 className="text-3xl w-full flex flex-col items-center text-neutral-800 bg-neutral-300">
                Loading...
              </h1>
            }
          >
            <OrderTable />
          </Suspense>

          <div className="flex w-full justify-center items-center mt-3 gap-6">
            <AnimatePresence id="deliverToggle">
              {delivered ? (
                <motion.button
                  id="hideDeliveredBtn"
                  className="px-3 py-2 text-sm bg-transparent border border-blue-500 rounded-lg"
                  onClick={() => toggleDelivered()}
                  whileHover={{
                    backgroundColor: "#2563eb",
                    borderRadius: "10px",
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                >
                  Hide Delivered
                </motion.button>
              ) : (
                <motion.button
                  id="showDeliveredBtn"
                  className="px-3 py-2 text-sm bg-transparent border border-blue-700 rounded-lg"
                  onClick={() => toggleDelivered()}
                  whileHover={{
                    backgroundColor: "#2563eb",
                    borderRadius: "10px",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Show Delivered
                </motion.button>
              )}
            </AnimatePresence>
            <motion.button
              id="removeAllBtn"
              className="px-3 py-2 text-sm bg-transparent border border-red-700 rounded-lg"
              onClick={() => handleRemoveAll("customers")}
              whileHover={{
                backgroundColor: "#dc2626",
                borderRadius: "10px",
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              Remove all
            </motion.button>
          </div>
        </div>
      </div>
      {/* <RemoveAll
        removeAlert={removeAlert}
        removeData={removeData}
        remove={remove}
        closeRemoveModal={closeRemoveModal}
      /> */}
      <AnimatePresence id="removeAllM" className="my-3">
        {removeAllModal && (
          <motion.div
            id="innerRemoveAllM"
            initial={"close"}
            animate={removeAllModal ? "open" : "close"}
            variants={variants}
            exit={"close"}
            className={`fixed top-0 bottom-0 right-0 left-0 z-10 bg-black/50 backdrop-blur-sm  flex ${
              removeAllModal ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <RemoveAllModal
              removeAllData={removeAllData}
              removeAll={removeAll}
              closeRemoveAllModal={closeRemoveAllModal}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </OrderDataContext.Provider>
  );
}

export const useOrderDataContext = () => useContext(OrderDataContext);
