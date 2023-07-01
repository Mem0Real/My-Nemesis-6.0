"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ItemContext = createContext({});

export default function ItemDataContext({ children }) {
  const [currentQuantity, setCurrentQuantity] = useState();

  const fetchCache = (id, quantity) => {
    const data = JSON.parse(window.localStorage.getItem("Product_Data"));
    if (data && data.length > 0) {
      data.map((product) => {
        if (product.id === id) {
          setCurrentQuantity(() => product.remainingQty);
        }
      });
    } else setCurrentQuantity(() => quantity);
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
