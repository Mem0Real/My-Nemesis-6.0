"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext({});

export default function Context({ children }) {
  const [cartData, setCartData] = useState();

  return (
    <CartContext.Provider value={{ cartData, setCartData }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);
