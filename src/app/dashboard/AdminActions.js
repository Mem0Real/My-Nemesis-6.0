"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useEffect } from "react";

import { parseCookies, setCookie } from "nookies";

const List = dynamic(() => import("./components/(list)/List"));
const Order = dynamic(() => import("./components/(order)/Order"));

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
    const data = JSON.parse(cookies.List);
    setShowList(data);
  }, []);

  useEffect(() => {
    const data = JSON.parse(cookies.Order);
    setShowOrder(data);
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="flex items-center gap-4 md:gap-12">
        <button
          className={`w-24 px-2 py-1 shadow-lg shadow-neutral-400 rounded-lg bg-transparent outline outline-1 hover:outline-2 outline-offset-2 hover:outline-offset-0 outline-neutral-800 ${
            showList && "outline-2 outline-offset-0 font-medium"
          }`}
          onClick={toggleList}
        >
          Categories
        </button>
        <button
          className={`w-24 px-2 py-1 shadow-lg shadow-neutral-400 rounded-lg bg-transparent outline outline-1 hover:outline-2 outline-offset-2 hover:outline-offset-0 outline-neutral-800 ${
            showOrder && "outline-2 outline-offset-0 font-medium"
          }`}
          onClick={toggleOrder}
        >
          Orders
        </button>
      </div>

      <div className="flex flex-col w-full min-h-screen">
        {showList && (
          <Suspense
            fallback={<h1 className="text-2xl text-neutral-800">Loading...</h1>}
          >
            <List
              data={data}
              create={create}
              update={update}
              deleteItem={deleteItem}
              url={url}
            />
          </Suspense>
        )}
        {showOrder && (
          <Suspense
            fallback={<h1 className="text-2xl text-neutral-800">Loading...</h1>}
          >
            <Order
              order={order}
              url={url}
              removeOne={removeOne}
              removeAll={removeAll}
              markDelivered={markDelivered}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}
