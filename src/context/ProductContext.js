"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { setCookie, hasCookie, getCookie } from "cookies-next";

const ProductContext = createContext({});

export default function ProductDataContext({ children }) {
  const [data, setData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [updater, setUpdater] = useState(false);
  const [purchasedData, setPurchasedData] = useState([]);

  // const cookieStore = parseCookies();

  useEffect(() => {
    // let cart, product;
    // if (cookieStore.Product && cookieStore.Product !== undefined)
    //   product = JSON.parse(cookieStore.Product);

    // if (product?.length > 0) {
    //   setData(product);
    // }
    // if (cookieStore.Cart && cookieStore.Cart !== undefined)
    //   cart = JSON.parse(cookieStore.Cart);
    // if (cart?.length > 0) {
    //   setCartData(cart);
    //   setCookie(null, "Cart_State", true);
    // }

    if (hasCookie("Product")) {
      const product = JSON.parse(getCookie("Product"));
      setData(product);
    } else setData();

    if (hasCookie("Cart")) {
      const cart = JSON.parse(getCookie("Cart"));
      setCartData(cart);
    } else setCartData();
  }, []);

  const storeProduct = (id, quantity) => {
    // If there is cache
    if (hasCookie("Product")) {
      const product = JSON.parse(getCookie("Product"));
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
        setCookie("Product", productData, { path: "/" });
      } else {
        const newData = { id: id, quantity: quantity };

        setData((prev) => [...prev, newData]);
        product.push(newData);
        setCookie("Product", product, { path: "/" });
      }
    } else {
      let newEntry = { id: id, quantity: quantity };
      setData(() => [newEntry]);
      setCookie("Product", [newEntry], { path: "/" });
    }
  };

  const addCartData = (id, name, quantity, amount, itemPrice) => {
    if (hasCookie("Cart")) {
      const cart = JSON.parse(getCookie("Cart"));

      const cartCache = cart.find((item) => item.id === id);
      let change = true;

      if (cartCache) {
        let cartItems = cart.map((item) => {
          if (item.id === id) {
            if (item.amount === amount) change = false;
            return {
              ...item,
              amount: parseInt(amount),
              totalPrice: itemPrice * amount,
            };
          }
          return item;
        });

        setCartData(cartItems);
        setCookie("Cart", cartItems);
        change === true && toast.success("Cart item updated!");
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
        setCookie("Cart", cart);
        toast.success("Item added to cart!");
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
      setCookie("Cart", [newCartItem]);

      toast.success("Item added to cart!");
    }
  };

  const addProductQuantity = (id) => {
    if (hasCookie("Product")) {
      const product = JSON.parse(getCookie("Product"));

      let newArray = product.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: parseInt(item.quantity) + 1 };
        }
        return item;
      });
      setData((prev) => [...prev, newArray]);
      setCookie("Product", newArray);
    } else {
      toast.error("Item not found!");
    }
  };

  const subtractProductQuantity = (id) => {
    if (hasCookie("Product")) {
      const product = JSON.parse(getCookie("Product"));
      let newArray = product.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: parseInt(item.quantity) - 1 };
        }
        return item;
      });
      setData((prev) => [...prev, newArray]);
      setCookie("Product", newArray);
    } else {
      toast.error("Item not found");
    }
  };

  const changeProductQuantity = (id, newQuantity) => {
    if (hasCookie("Cart")) {
      const cart = JSON.parse(getCookie("Cart"));

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
      setCookie("Product", newArray);
    } else {
      toast.error("Item not found");
    }
  };

  const addCartQuantity = (id) => {
    if (hasCookie("Cart")) {
      const cart = JSON.parse(getCookie("Cart"));

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
      setCookie("Cart", newArray);
    } else {
      toast.error("Item not found");
    }
  };

  const subtractCartQuantity = (id) => {
    if (hasCookie("Cart")) {
      const cart = JSON.parse(getCookie("Cart"));

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
      setCookie("Cart", newArray);
    } else {
      toast.error("Item not found");
    }
  };

  const changeCartQuantity = (id, newQuantity) => {
    if (hasCookie("Cart")) {
      const cart = JSON.parse(getCookie("Cart"));

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
      setCookie("Cart", newArray);
    } else {
      toast.error("Item not found");
    }
  };

  const removeCartItem = (id) => {
    if (hasCookie("Cart")) {
      const cart = JSON.parse(getCookie("Cart"));

      let newArray = cart
        .map((item) => {
          if (item.id === id) {
            return null;
          }
          return item;
        })
        .filter((item) => item !== null);
      setCookie("Cart", newArray);
    } else {
      toast.error("Item not found");
    }
  };

  const removeProductItem = (id) => {
    if (hasCookie("Product")) {
      const product = JSON.parse(getCookie("Product"));

      let newArray = product
        .map((item) => {
          if (item.id === id) {
            return null;
          }
          return item;
        })
        .filter((item) => item !== null);
      setCookie("Product", newArray);
    } else {
      toast.error("Item not found");
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
    removeCartItem(id);
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
        updater,
        setUpdater,
        removeItem,
        purchasedData,
        setPurchasedData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProductContext = () => useContext(ProductContext);
