"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ItemContext = createContext({});

export default function ItemDataContext({ children }) {
  const [productData, setProductData] = useState();
  const [currentQuantity, setCurrentQuantity] = useState();

  const [restoredData, setRestoredData] = useState();

  useEffect(() => {
    if (restoredData) {
      localStorage.setItem(
        "Restored_Item",
        JSON.stringify(restoredData.id, restoredData.quantity)
      );
    }
  }, [restoredData]);

  const refetch = (id, quantity) => {
    const data = JSON.parse(window.localStorage.getItem("Product_Data"));
    if (data && data.length > 0) {
      setProductData(() => data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          setCurrentQuantity(() => data[i].remainingQty);
          break;
        } else setCurrentQuantity(() => quantity);
      }
    } else {
      setCurrentQuantity(() => quantity);
    }
  };

  const updateQuantity = (id, quantity) => {
    const data = JSON.parse(window.localStorage.getItem("Product_Data"));
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          setCurrentQuantity(() => data[i].remainingQty);
          break;
        } else setCurrentQuantity(() => quantity);
      }
    } else {
      setCurrentQuantity(() => quantity);
    }
  };

  const restoreQuantity = (id, quantity) => {
    const data = JSON.parse(window.localStorage.getItem("Product_Data"));
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id !== id) {
          setCurrentQuantity(() => quantity);
          setRestoredData({ id: id, quantity: quantity });
          break;
        }
      }
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
        restoreQuantity,
        restoredData,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export const useItemContext = () => useContext(ItemContext);
