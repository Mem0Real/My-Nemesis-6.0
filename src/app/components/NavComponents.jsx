"use client";

import { useEffect, useState, useRef, createContext, useContext } from "react";

import Link from "next/link";
import { Poppins, Raleway } from "next/font/google";

import SearchModal from "../search/(searchModal)/SearchModal";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import { SearchOutlined } from "@mui/icons-material";
import Cart from "../cart/Cart";
import { useCartContext } from "@/context/cartContext";
import { useItemContext } from "@/context/itemContext";

const FunctionsContext = createContext({});

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  fallback: ["system-ui", "arial"],
});

const raleway = Raleway({
  subsets: ["cyrillic"],
  display: "swap",
});

export default function NavComponents({ data, getAll, getOne }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchModal, showSearchModal] = useState(false);
  const [cartModal, showCartModal] = useState(false);
  const [newCart, setNewCart] = useState(false);

  const { cartData } = useCartContext();
  const { refetch, updateQuantity } = useItemContext();

  const menuRef = useRef();

  // console.log(cartData, cartData.length);

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (cartData.length > 0) {
      setNewCart(true);
    } else setNewCart(false);
  }, [cartData]);

  // useEffect(() => {
  //   const data = window.localStorage.getItem("Cart_State");
  //   if (data) setNewCart(data);
  // }, [cartData]);

  const handleSearch = () => {
    showSearchModal(true);
  };

  const closeSearch = () => {
    showSearchModal(false);
  };

  const showCart = () => {
    showCartModal(true);
  };

  const closeCart = () => {
    showCartModal(false);
    refetch();
  };
  return (
    <div ref={menuRef} className="w-full">
      {/* Buttons */}
      <div className="hidden md:flex justify-between items-center">
        <div className="">
          {/* <SearchInput /> */}
          <button
            name="search"
            type="submit"
            onClick={handleSearch}
            className="flex items-center cursor-pointer justify-between md:w-56"
          >
            <p className="px-6 md:pl-4 py-3 w-full rounded-md sm:py-2 flex-1 text-zinc-200 bg-zinc-800">
              Search products...
            </p>
            <span className="pr-4 -ml-7">
              {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
              <SearchOutlined fontSize="small" />
            </span>
          </button>
        </div>
        <div className="flex justify-end gap-2 md:gap-7 lg:gap-10">
          <Link href="/collection">
            <div className="underline underline-offset-8 hover:underline-offset-4">
              Collection
            </div>
          </Link>
          <Link href="/services">
            <div className="underline underline-offset-8 hover:underline-offset-4">
              Services
            </div>
          </Link>
          <Link href="/about">
            <div className="underline underline-offset-8 hover:underline-offset-4">
              About
            </div>
          </Link>
          <Link href="/dashboard">
            <div className="underline underline-offset-8 hover:underline-offset-4">
              Dashboard
            </div>
          </Link>
          <button
            name="cart"
            type="button"
            onClick={showCart}
            className="relative"
          >
            <ShoppingCartCheckoutOutlinedIcon fontSize="small" />
            {newCart && (
              <div className="absolute w-1.5 h-1.5 -top-[2px] -right-1 bg-red-500 rounded-full p-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* Hamburger */}
      <div className="flex gap-7 justify-end items-center md:hidden text-white relative">
        <button name="search" type="submit" onClick={handleSearch}>
          <SearchOutlined fontSize="small" />
        </button>
        <button className="relative" onClick={showCart} name="cart modal">
          <ShoppingCartCheckoutOutlinedIcon fontSize="small" />
          {newCart && (
            <div className="absolute w-1.5 h-1.5 -top-[2px] -right-1 bg-red-500 rounded-full p-0.5" />
          )}
        </button>
        <button
          name="dropdown button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center py-2 rounded text-black-500 hover:text-black-400"
        >
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>

      {/* Hamburger Menu */}
      <div
        className={`w-full flex-grow lg:flex lg:items-center lg:w-auto z-20 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ul className="text-sm md:hidden block bg-neutral-900 py-5 mt-0 md:mt-9 list-none">
          <li>
            <Link
              href="/collection"
              className="block mt-4 border-b lg:inline-block lg:mt-0 text-white-200 mr-4 ml-10 hover:border-b border-white border-spacing-y-2 py-3 font-medium"
            >
              Collection
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="block mt-4 border-b lg:inline-block lg:mt-0 text-white-200 mr-4 ml-10 hover:border-b border-white border-spacing-y-2 py-3 font-medium"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block mt-4 border-b lg:inline-block lg:mt-0 text-white-200 mr-4 ml-10 hover:border-b border-white border-spacing-y-2 py-3 font-medium"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className="block mt-4 border-b lg:inline-block lg:mt-0 text-white-200 mr-4 ml-10 hover:border-b border-white border-spacing-y-2 py-3 font-medium"
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </div>

      <FunctionsContext.Provider value={{ getOne, getAll, data, closeSearch }}>
        <SearchModal modal={searchModal} />
        <Cart modal={cartModal} closeCart={closeCart} />
      </FunctionsContext.Provider>
    </div>
  );
}

export const useFunctionsContext = () => useContext(FunctionsContext);
