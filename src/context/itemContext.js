"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ItemContext = createContext({});

export default function ItemDataContext({ children }) {
  const [productData, setProductData] = useState();
  const [currentQuantity, setCurrentQuantity] = useState();

  const refetch = () => {
    const data = JSON.parse(window.localStorage.getItem("Product_Data"));
    if (data && data.length > 0) {
      setProductData(() => data);
      console.log("Product data updated with cache: ", data);
    }
  };

  const updateQuantity = (id, quantity) => {
    console.log("Setting currentQuantity...");
    const data = JSON.parse(window.localStorage.getItem("Product_Data"));
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          setCurrentQuantity(() => data[i].remainingQty);
          break;
        } else setCurrentQuantity(() => quantity);
      }
    } else {
      console.log("Empty");
      setCurrentQuantity(() => quantity);
    }
  };
  return (
    <ItemContext.Provider
      value={{
        refetch,
        productData,
        setProductData,
        updateQuantity,
        currentQuantity,
        setCurrentQuantity,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export const useItemContext = () => useContext(ItemContext);
