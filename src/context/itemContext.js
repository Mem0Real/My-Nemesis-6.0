"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ItemContext = createContext({});

export default function ItemDataContext({ children }) {
  const [currentQuantity, setCurrentQuantity] = useState();

  const fetchCache = (item) => {
    const data = JSON.parse(window.localStorage.getItem("Product_Data"));
    if (data.length > 0) {
      data.map((product) => {
        if (product.id === item.id) {
          setCurrentQuantity(() => product.remainingQty);
        }
      });
    } else setCurrentQuantity(() => item.quantity);
  };

  return (
    <ItemContext.Provider
      value={{ fetchCache, currentQuantity, setCurrentQuantity }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export const useItemContext = () => useContext(ItemContext);
