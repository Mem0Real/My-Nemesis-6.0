"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useEffect } from "react";

const List = dynamic(() => import("./components/(list)/List"));

export default function AdminActions({
  data,
  create,
  update,
  deleteItem,
  url,
}) {
  const [showList, setShowList] = useState(false);
  const [showOrder, setShowOrder] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("LIST");
    if (data !== null && showOrder === false) setShowList(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("LIST", JSON.stringify(showList));
  }, [showList]);

  useEffect(() => {
    const data = localStorage.getItem("ORDER");
    if (data !== null && showList === false) setShowOrder(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("ORDER", JSON.stringify(showOrder));
  }, [showOrder]);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="flex items-center gap-4 md:gap-12">
        <button
          className={`w-36 px-3 py-2 rounded-lg bg-transparent outline outline-1 hover:outline-2 outline-offset-2 hover:outline-offset-0 outline-neutral-800 ${
            showList && "outline-2 outline-offset-0 font-medium"
          }`}
          onClick={() => setShowList(!showList)}
        >
          Categories
        </button>
        <button className="w-36 px-3 py-2 rounded-lg bg-transparent outline outline-1 hover:outline-2 outline-offset-2 hover:outline-offset-0 outline-neutral-800">
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
            <List
              data={data}
              create={create}
              update={update}
              deleteItem={deleteItem}
              url={url}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}
