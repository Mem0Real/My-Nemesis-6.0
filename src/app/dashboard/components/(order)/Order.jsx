"use client";

import {
  useState,
  useEffect,
  Suspense,
  createContext,
  useContext,
} from "react";
import OrderTable from "./OrderTable";
import Button from "@mui/material/Button";

const OrderDataContext = createContext({});

export default function Order({ order, url }) {
  const [showDelivered, setShowDelivered] = useState(true);

  const hideDelivered = () => {
    setShowDelivered(false);
  };
  return (
    <OrderDataContext.Provider value={{ hideDelivered, order, url }}>
      <div className="flex-flex-col w-full items-center justify-center relative min-h-screen h-fit bg-neutral-200 text-neutral-900 md:mt-6">
        <h1 className="text-2xl font-mono font-thin mt-2 underline underline-offset-4 text-center">
          Order list
        </h1>
        <div className="md:mt-6 md:pb-5 shadow-md shadow-black">
          <Suspense fallback={<h1>Loading...</h1>}>
            <OrderTable order={order} url={url} showDelivered={showDelivered} />
          </Suspense>

          <div className="flex w-full justify-center items-center md:mt-3 gap-6">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => hideDelivered()}
            >
              Cache Completed
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => removeAll()}
            >
              Remove all
            </Button>
          </div>
        </div>
      </div>
    </OrderDataContext.Provider>
  );
}

export const useOrderDataContext = () => useContext(OrderDataContext);
