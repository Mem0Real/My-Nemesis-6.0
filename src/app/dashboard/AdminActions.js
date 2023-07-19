"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useEffect } from "react";

import { parseCookies, setCookie } from "nookies";

const List = dynamic(() => import("./components/(list)/List"));
const Order = dynamic(() => import("./components/(order)/Order"));

import { motion, AnimatePresence } from "framer-motion";

export default function AdminActions({
  data,
  create,
  update,
  deleteItem,
  removeOne,
  removeAll,
  markDelivered,
  url,
  order,
}) {
  const [showList, setShowList] = useState();
  const [showOrder, setShowOrder] = useState();
  const cookies = parseCookies();

  const toggleList = () => {
    setShowList((prev) => !prev);
    setShowOrder(() => false);

    setCookie(null, "List", !showList);
    setCookie(null, "Order", false);
  };

  const toggleOrder = () => {
    setShowOrder((prev) => !prev);
    setShowList(false);

    setCookie(null, "Order", !showOrder);
    setCookie(null, "List", false);
  };

  useEffect(() => {
    let data;
    if (cookies?.List !== undefined) data = JSON.parse(cookies.List);
    setShowList(data);
  }, []);

  useEffect(() => {
    let data;
    if (cookies?.Order !== undefined) data = JSON.parse(cookies.Order);
    setShowOrder(data);
  }, []);

  const variants = {
    open: {
      boxShadow: "0px 0px 9px black",
    },
    close: {},
    openTable: {
      y: "10px",
      opacity: 1,
    },
    closeTable: {
      y: "-10px",
      opacity: 0,
    },
    hover: {
      backgroundColor: "#777",
      cursor: "pointer",
    },
  };

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="flex items-center gap-4 md:gap-12">
        <motion.button
          key="list"
          animate={showList ? "open" : "close"}
          variants={variants}
          className={`w-24 px-2 py-1 rounded-lg bg-transparent outline outline-1 outline-offset-2 outline-neutral-800`}
          onClick={toggleList}
          whileHover={{
            scale: 1.02,

            boxShadow: "0px 0px 9px black",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Categories
        </motion.button>
        <motion.button
          key="order"
          animate={showOrder ? "open" : "close"}
          variants={variants}
          className={`w-24 px-2 py-1 rounded-lg bg-transparent outline outline-1 outline-offset-2 outline-neutral-800 `}
          onClick={toggleOrder}
          whileHover={{
            scale: 1.02,

            boxShadow: "0px 0px 9px black",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Orders
        </motion.button>
      </div>

      <div className="flex flex-col w-full bg-neutral-300 min-h-screen">
        <AnimatePresence key="list">
          {showList && (
            <Suspense
              fallback={
                <h1 className="text-2xl text-neutral-800 bg-neutral-300">
                  Loading...
                </h1>
              }
            >
              <motion.div
                key="inner-list"
                animate={showList ? "openTable" : "closeTable"}
                variants={variants}
                exit={"closeTable"}
              >
                <List
                  data={data}
                  create={create}
                  update={update}
                  deleteItem={deleteItem}
                  url={url}
                />
              </motion.div>
            </Suspense>
          )}
        </AnimatePresence>
        <AnimatePresence key="order">
          {showOrder && (
            <Suspense
              fallback={
                <h1 className="text-2xl text-neutral-800 bg-neutral-300">
                  Loading...
                </h1>
              }
            >
              <motion.div
                key="inner-order"
                animate={showOrder ? "openTable" : "closeTable"}
                variants={variants}
                exit={"closeTable"}
              >
                <Order
                  order={order}
                  url={url}
                  removeOne={removeOne}
                  removeAll={removeAll}
                  markDelivered={markDelivered}
                />
              </motion.div>
            </Suspense>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
