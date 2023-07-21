"use client";

import { useEffect, useState, useRef, createContext, useContext } from "react";
import { signOut } from "next-auth/react";

import Link from "next/link";
import dynamic from "next/dynamic";

import SearchModal from "../search/(searchModal)/SearchModal";
import { useProductContext } from "@/context/productContext";
import { useCartContext } from "./CartBase";

import { useRouter } from "next/navigation";
import { setCookie, parseCookies } from "nookies";

import { motion, AnimatePresence } from "framer-motion";
import { Poppins, Raleway } from "next/font/google";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useSearchContext } from "../search/SearchBase";

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

export default function NavComponents({ session }) {
  const [isOpen, setIsOpen] = useState(false);
  // const [searchModal, showSearchModal] = useState(false);

  // TODO new cart notification still not working
  const [newCart, setNewCart] = useState(false);

  const { updater, setUpdater } = useProductContext();
  const { openCartModal } = useCartContext();
  const { handleSearch } = useSearchContext();

  const menuRef = useRef();
  const router = useRouter();
  const cookieStore = parseCookies();

  // useEffect(() => {
  //   if (cartModal) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // }, [cartModal]);

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
    let cartState;
    if (cookieStore.Cart_State && cookieStore.Cart_State !== undefined)
      cartState = JSON.parse(cookieStore.Cart_State);

    if (cartState && cartState === true) {
      setNewCart(() => true);
    } else setNewCart(() => false);
  }, [updater]);

  // const handleSearch = () => {
  //   showSearchModal(true);
  // };

  // const closeSearch = () => {
  //   showSearchModal(false);
  // };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    setCookie(null, "next-auth.session-token");
    setCookie(null, "next-auth.callback-url");
    setCookie(null, "accessToken");
    setCookie(null, "next-auth.csrf-token");

    // Refresh the page to update the session
    router.refresh();
    router.push("/");
  };

  return (
    <div ref={menuRef} className="w-full">
      {/* Buttons */}
      <div className="hidden md:flex justify-between items-center">
        {/* <SearchInput /> */}
        <div
          className="relative flex items-center cursor-pointer justify-end py-2 rounded-lg w-40 text-zinc-200 bg-zinc-800"
          onClick={handleSearch}
        >
          <p className="md:pr-2 lg:pr-4">Search Products</p>
          <SearchOutlined className="text-lg absolute left-3 top-[2px] z-10 self-center text-neutral-200" />
        </div>
        <div className="flex justify-end items-center gap-2 md:gap-7 lg:gap-10">
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
          <div
            className={`border-red-800 px-2 py-1 rounded-md cursor-pointer transition-all ease-in-out border-b shadow-sm shadow-red-800/70 hover:shadow-red-500/70 ${
              !session && "hidden"
            }`}
            onClick={handleSignOut}
          >
            Logout
          </div>

          <div className="relative">
            <ShoppingCartOutlined
              onClick={openCartModal}
              className="cursor-pointer text-lg"
            />

            <div
              className={`absolute w-1.2 h-1.2 top-1 -right-1 bg-red-500 rounded-full p-0.7 ${
                !newCart && "hidden"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Hamburger */}
      <div className="flex gap-7 justify-end items-center md:hidden text-white relative">
        <button name="search-small" onClick={handleSearch} className="text-lg">
          <SearchOutlined />
        </button>
        <div className="relative">
          <ShoppingCartOutlined
            onClick={openCartModal}
            className="cursor-pointer text-lg"
          />
          <div
            className={`absolute w-1.2 h-1.2 top-1 -right-1 bg-red-500 rounded-full p-0.7 z-10 ${
              !newCart && "hidden"
            }`}
          />
        </div>
        <button
          name="menu"
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
          {session && (
            <li className="relative py-6">
              <button
                onClick={handleSignOut}
                className="block absolute right-4 top-2 z-10 mt-4 border rounded-xl lg:inline-block lg:mt-0 text-white-200 mr-4 ml-10 hover:border-b border-red-700 border-spacing-y-2 py-3 px-4 font-medium"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* <FunctionsContext.Provider value={{ getOne, getAll, data, closeSearch }}> */}
      {/* <SearchModal modal={searchModal} /> */}
      {/* <Cart modal={cartModal} closeCart={closeCart} /> */}
      {/* </FunctionsContext.Provider> */}
    </div>
  );
}

export const useFunctionsContext = () => useContext(FunctionsContext);
