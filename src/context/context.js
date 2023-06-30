"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext({});

export default function Context({ children }) {
  const [cartData, setCartData] = useState([]);

  // Peristent Cart Data
  useEffect(() => {
    const data = window.localStorage.getItem("Cart_Data");
    if (data !== null) setCartData(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("Cart_Data", JSON.stringify(cartData));
  }, [cartData]);

  return (
    <CartContext.Provider value={{ cartData, setCartData }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);
