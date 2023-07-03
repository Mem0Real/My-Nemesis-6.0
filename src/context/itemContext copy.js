"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ItemContext = createContext({});

export default function ItemDataContext({ children }) {
  const [currentQuantity, setCurrentQuantity] = useState();
  //   const fetchCache = (id) => {
  //     const data = JSON.parse(window.localStorage.getItem("Product_Data"));
  //     if (data && data.length > 0) {
  //       data.map((product) => {
  //         if (product.id === id) {
  //           setCurrentQuantity(() => product.remainingQty);
  //           console.log("Set updated qty: ", product.remainingQty);
  //         }
  //         setCurrentQuantity(() => product.originalQty);
  //       });
  //     }
  //   };

  const fetchCache = (id, quantity = null) => {
    const data = JSON.parse(window.localStorage.getItem("Product_Data"));
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          setCurrentQuantity(() => data[i].remainingQty);
          break;
        } else {
          setCurrentQuantity(() => quantity);
        }
      }
    } else {
      setCurrentQuantity(() => quantity);
    }
  };
  const clearCache = (id) => {
    const data = JSON.parse(window.localStorage.getItem("Product_Data"));
    if (data && data.length > 0) {
      data.map((product) => {
        if (product.id === id) {
          setCurrentQuantity(() => product.originalQty);
        }
      });
    }
  };

  //   const clearCache = (id, quantity) => {
  //     const data = JSON.parse(window.localStorage.getItem("Product_Data"));
  //     if (data && data.length > 0) {
  //       for (let i = 0; i < data.length; i++) {
  //         if (data[i].id === id) {
  //           setCurrentQuantity(() => quantity);
  //           console.log("Set updated qty: ", quantity);
  //           break;
  //         }
  //       }
  //     }
  //   };

  return (
    <ItemContext.Provider
      value={{ fetchCache, clearCache, currentQuantity, setCurrentQuantity }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export const useItemContext = () => useContext(ItemContext);
