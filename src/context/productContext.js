"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext({});

export default function ProductDataContext({ children }) {
  const [data, setData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const product = JSON.parse(localStorage.getItem("Product"));
    if (product?.length > 0) {
      console.log(product);
      setData(product);
    }
    const cart = JSON.parse(localStorage.getItem("Cart"));
    if (cart?.length > 0) {
      setCartData(cart);
      localStorage.setItem("Cart_State", JSON.stringify(true));
    }
  }, []);

  const storeProduct = (id, quantity) => {
    const product = JSON.parse(localStorage.getItem("Product"));

    // If there is cache
    if (product?.length > 0) {
      const productCache = product.find((item) => item.id === id);

      // If product exists in cache
      if (productCache) {
        let productData = data.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: quantity };
          }
          return item;
        });
        setData(productData);
        localStorage.setItem("Product", JSON.stringify(productData));
      } else {
        const newData = { id: id, quantity: quantity };

        setData((prev) => [...prev, newData]);
        product.push(newData);
        localStorage.setItem("Product", JSON.stringify(product));
      }
    } else {
      let newEntry = { id: id, quantity: quantity };
      setData(() => [newEntry]);
      localStorage.setItem("Product", JSON.stringify([newEntry]));
    }
  };

  const addCartData = (id, name, quantity, amount, itemPrice) => {
    const cart = JSON.parse(localStorage.getItem("Cart"));

    if (cart?.length > 0) {
      const cartCache = cart.find((item) => item.id === id);

      if (cartCache) {
        let cartItems = cartData.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              amount: parseInt(amount),
              totalPrice: itemPrice * amount,
            };
          }
          return item;
        });

        setCartData(cartItems);
        localStorage.setItem("Cart", JSON.stringify(cartItems));
      } else {
        const newCartItem = {
          id: id,
          name: name,
          quantity: quantity,
          amount: parseInt(amount),
          itemPrice: itemPrice,
          totalPrice: amount * itemPrice,
        };

        setCartData((prev) => [...prev, newCartItem]);
        cart.push(newCartItem);
        localStorage.setItem("Cart", JSON.stringify(cart));
      }
    } else {
      let newCartItem = {
        id: id,
        name: name,
        quantity: quantity,
        amount: amount,
        itemPrice: itemPrice,
        totalPrice: amount * itemPrice,
      };
      setCartData(() => [newCartItem]);
      localStorage.setItem("Cart", JSON.stringify([newCartItem]));
    }
  };

  const addProductQuantity = (id) => {
    const product = JSON.parse(localStorage.getItem("Product"));

    if (product?.length > 0) {
      let newArray = product.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: parseInt(item.quantity) + 1 };
        }
        return item;
      });
      setData((prev) => [...prev, newArray]);
      localStorage.setItem("Product", JSON.stringify(newArray));
    } else {
      console.log("Item not found");
    }
  };

  const subtractProductQuantity = (id) => {
    const product = JSON.parse(localStorage.getItem("Product"));

    if (product?.length > 0) {
      let newArray = product.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: parseInt(item.quantity) - 1 };
        }
        return item;
      });
      setData((prev) => [...prev, newArray]);
      localStorage.setItem("Product", JSON.stringify(newArray));
    } else {
      console.log("Item not found");
    }
  };

  const changeProductQuantity = (id, newQuantity) => {
    const cart = JSON.parse(localStorage.getItem("Cart"));
    if (cart?.length > 0) {
      let newArray = cart.map((item) => {
        if (item.id === id) {
          if (newQuantity > item.quantity) {
            return { id: item.id, quantity: parseInt(item.quantity) };
          }
          if (newQuantity <= 0) {
            return { id: item.id, quantity: 1 };
          }
          return {
            id: item.id,
            quantity: parseInt(item.quantity - newQuantity),
          };
        }
        return { id: item.id, quantity: item.quantity - item.amount };
      });
      setData((prev) => [...prev, newArray]);
      localStorage.setItem("Product", JSON.stringify(newArray));
    } else {
      console.log("Item not found!");
    }
  };

  const addCartQuantity = (id) => {
    const cart = JSON.parse(localStorage.getItem("Cart"));

    if (cart?.length > 0) {
      let newArray = cart.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            amount: parseInt(item.amount) + 1,
            totalPrice: item.itemPrice * (parseInt(item.amount) + 1),
          };
        }
        return item;
      });
      setCartData((prev) => [...prev, newArray]);
      localStorage.setItem("Cart", JSON.stringify(newArray));
    } else {
      console.log("Item not found");
    }
  };

  const subtractCartQuantity = (id) => {
    const cart = JSON.parse(localStorage.getItem("Cart"));

    if (cart?.length > 0) {
      let newArray = cart.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            amount: parseInt(item.amount) - 1,
            totalPrice: item.itemPrice * (parseInt(item.amount) - 1),
          };
        }
        return item;
      });
      setCartData((prev) => [...prev, newArray]);
      localStorage.setItem("Cart", JSON.stringify(newArray));
    } else {
      console.log("Item not found");
    }
  };

  const changeCartQuantity = (id, newQuantity) => {
    const cart = JSON.parse(localStorage.getItem("Cart"));
    if (cart?.length > 0) {
      let newArray = cart.map((item) => {
        if (item.id === id) {
          if (newQuantity > item.quantity) {
            return {
              ...item,
              amount: parseInt(item.quantity),
              totalPrice: item.itemPrice * item.quantity,
            };
          }
          if (newQuantity <= 0) {
            return {
              ...item,
              amount: 1,
              totalPrice: item.itemPrice * 1,
            };
          }
          return {
            ...item,
            amount: parseInt(newQuantity),
            totalPrice: item.itemPrice * newQuantity,
          };
        }
        return item;
      });
      setData((prev) => [...prev, newArray]);
      localStorage.setItem("Cart", JSON.stringify(newArray));
    } else {
      console.log("Item not found!");
    }
  };

  const removeCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("Cart"));
    if (cart?.length > 0) {
      let newArray = cart
        .map((item) => {
          if (item.id === id) {
            return null;
          }
          return item;
        })
        .filter((item) => item !== null);
      localStorage.setItem("Cart", JSON.stringify(newArray));
    } else {
      console.log("Item not found.");
    }
  };

  const removeProductItem = (id) => {
    const product = JSON.parse(localStorage.getItem("Product"));
    if (product?.length > 0) {
      let newArray = product
        .map((item) => {
          if (item.id === id) {
            return null;
          }
          return item;
        })
        .filter((item) => item !== null);
      localStorage.setItem("Product", JSON.stringify(newArray));
    } else {
      console.log("Item not found.");
    }
  };

  const subtractQuantity = (id) => {
    addProductQuantity(id);
    subtractCartQuantity(id);
  };

  const addQuantity = (id) => {
    subtractProductQuantity(id);
    addCartQuantity(id);
  };

  const changeQuantity = (id, newQuantity) => {
    changeProductQuantity(id, newQuantity);
    changeCartQuantity(id, newQuantity);
  };

  const removeItem = (id) => {
    // restoreCartQuantity(id);
    removeCartItem(id);
    // restoreProductQuantity(id);
    removeProductItem(id);
  };

  return (
    <ProductContext.Provider
      value={{
        data,
        setData,
        storeProduct,
        addCartData,
        subtractQuantity,
        addQuantity,
        changeQuantity,
        update,
        setUpdate,
        removeItem,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProductContext = () => useContext(ProductContext);
