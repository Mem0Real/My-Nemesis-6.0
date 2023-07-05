"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useEffect } from "react";

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

  const toggleList = () => {
    setShowList(!showList);
    setShowOrder(false);
    localStorage.setItem("LIST", JSON.stringify(!showList));
    localStorage.setItem("ORDER", JSON.stringify(false));
  };

  const toggleOrder = () => {
    setShowOrder(!showOrder);
    setShowList(false);
    localStorage.setItem("ORDER", JSON.stringify(!showOrder));
    localStorage.setItem("LIST", JSON.stringify(false));
  };

  useEffect(() => {
    const data = localStorage.getItem("LIST");
    if (data !== null) setShowList(JSON.parse(data));
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("ORDER");
    if (data !== null) setShowOrder(JSON.parse(data));
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="flex items-center gap-4 md:gap-12">
        <button
          className={`w-36 px-3 py-2 rounded-lg bg-transparent outline outline-1 hover:outline-2 outline-offset-2 hover:outline-offset-0 outline-neutral-800 ${
            showList && "outline-2 outline-offset-0 font-medium"
          }`}
          onClick={toggleList}
        >
          Categories
        </button>
        <button
          className={`w-36 px-3 py-2 rounded-lg bg-transparent outline outline-1 hover:outline-2 outline-offset-2 hover:outline-offset-0 outline-neutral-800 ${
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
            fallback={<h1 className="text-2xl text-neutral-200">Loading...</h1>}
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
            fallback={<h1 className="text-2xl text-neutral-200">Loading...</h1>}
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
