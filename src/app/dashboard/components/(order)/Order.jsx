"use client";

import {
  useState,
  useEffect,
  Suspense,
  createContext,
  useContext,
  useRef,
} from "react";
import dynamic from "next/dynamic";

import OrderTable from "./OrderTable";
const RemoveAllModal = dynamic(() => import("./RemoveAll"));

const OrderDataContext = createContext({});

import { motion, AnimatePresence } from "framer-motion";
import { setCookie, getCookie, hasCookie } from "cookies-next";
import { useIcons } from "@/app/utils/CustomIcons";

export default function Order({
  order,
  url,
  removeOne,
  removeAll,
  markDelivered,
}) {
  const [settings, showSettings] = useState(false);

  const [delivered, showDelivered] = useState(false);

  const [removeAllModal, showRemoveAllModal] = useState(false);
  const [removeAllData, setRemoveAllData] = useState({});

  const removeAllRef = useRef();

  const { SettingsIcon } = useIcons();

  // Disable scrollbar on modal open
  useEffect(() => {
    const handleWindowWheel = (event) => {
      if (removeAllModal) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWindowWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWindowWheel);
    };
  }, [removeAllModal]);

  // Close "RemoveAll" modal on click outside
  useEffect(() => {
    let handler = (e) => {
      if (removeAllModal && !removeAllRef.current.contains(e.target)) {
        closeRemoveAllModal();
      }
    };
    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, [removeAllModal]);

  useEffect(() => {
    if (hasCookie("Delivered"))
      showDelivered(JSON.parse(getCookie("Delivered")));
    else showDelivered(false);
  }, []);

  useEffect(() => {
    setCookie("Delivered", delivered);
  }, [delivered]);

  const toggleSettings = () => {
    showSettings(!settings);
  };

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
      value={{
        order,
        url,
        delivered,
        markDelivered,
        removeOne,
        removeAllRef,
      }}
    >
      <div className="flex-flex-col w-full items-center justify-center relative min-h-screen bg-transparent text-neutral-800 dark:text-neutral-200 md:mt-6">
        <div className="flex items-center gap-3 w-full justify-center mt-5 mb-24 md:mb-16">
          <h1 className="text-2xl font-mono font-thin underline underline-offset-4 text-center">
            Order list
          </h1>
          <motion.div
            onClick={toggleSettings}
            className="relative cursor-pointer flex flex-col justify-center items-center"
          >
            <motion.span
              whileTap={{ scale: [1, 0.6, 1] }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {SettingsIcon}
            </motion.span>
            <AnimatePresence>
              {settings && (
                <motion.div
                  className="absolute top-10 md:-top-2 right-3 md:-right-[155px] w-36 h-24 py-3 bg-neutral-100/10 dark:bg-neutral-800/10 backdrop-blur-sm  border border-neutral-500 rounded-md overflow-hidden"
                  initial={{ opacity: 0, scale: 0.3, x: -25 }}
                  animate={
                    settings
                      ? { opacity: 1, scale: 1, x: 0 }
                      : { opacity: 0, scale: 0.3, x: -25 }
                  }
                  exit={{ opacity: 0, scale: 0.3, x: -25 }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    dampness: 190,
                  }}
                >
                  <div className="flex flex-col justify-center items-center gap-2">
                    <AnimatePresence id="deliverToggle">
                      {delivered ? (
                        <motion.button
                          id="hideDeliveredBtn"
                          className="px-2 py-1 text-sm bg-transparent border border-blue-500 rounded-lg"
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
                      className="px-2 py-1 text-sm bg-transparent border border-red-700 rounded-lg"
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
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        <div className="md:mt-6 md:pb-5 min-h-screen text-neutral-800 dark:text-neutral-200">
          <Suspense
            fallback={
              <h1 className="text-3xl w-full flex flex-col items-center text-neutral-800 dark:text-neutral-200">
                Loading...
              </h1>
            }
          >
            <OrderTable />
          </Suspense>
        </div>
      </div>
      <AnimatePresence id="removeAllM" className="my-3">
        {removeAllModal && (
          <motion.div
            id="innerRemoveAllM"
            initial={"close"}
            animate={removeAllModal ? "open" : "close"}
            variants={variants}
            exit={"close"}
            className={`fixed top-0 bottom-0 right-0 left-0 z-40 bg-neutral-200/30 dark:bg-neutral-900/30 backdrop-blur-sm  flex ${
              removeAllModal ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <RemoveAllModal
              removeAllData={removeAllData}
              removeAll={removeAll}
              closeRemoveAllModal={closeRemoveAllModal}
              removeAllRef={removeAllRef}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </OrderDataContext.Provider>
  );
}

export const useOrderDataContext = () => useContext(OrderDataContext);
