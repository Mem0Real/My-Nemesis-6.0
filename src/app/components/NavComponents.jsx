"use client";

import { useEffect, useState, useRef, createContext, useContext } from "react";
import { signOut } from "next-auth/react";

import Link from "next/link";

import { useCartContext } from "../cart/CartBase";
import { ThemeSwitcher } from "./ThemeSwitcher";

import { useRouter } from "next/navigation";
import { setCookie, parseCookies } from "nookies";

import { motion, AnimatePresence } from "framer-motion";
import { Poppins, Raleway } from "next/font/google";
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

  const { openCartModal, newCart } = useCartContext();
  const { handleSearch } = useSearchContext();

  const menuRef = useRef();
  const router = useRouter();
  const cookieStore = parseCookies();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
          className="relative flex-initial mr-4 flex items-center cursor-pointer justify-end py-2 rounded-md outline outline-1 hover:outline-2outline-neutral-800 text-zinc-800 bg-zinc-200 dark:outline-neutral-200 w-40 dark:text-zinc-200 dark:bg-zinc-800"
          onClick={handleSearch}
        >
          <p className="md:pr-2 lg:pr-4">Search Products...</p>
          <div className="text-lg absolute left-3 top-0 bottom-0 grid place-content-center z-10 text-neutral-800 dark:text-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
        </div>
        <div className="flex justify-end items-center gap-2 md:gap-7 lg:gap-10">
          <ThemeSwitcher />

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
            <span onClick={openCartModal} className="cursor-pointer text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </span>

            <div
              className={`absolute w-1.2 h-1.2 -top-1 -right-1 bg-red-600 rounded-full p-1 ${
                !newCart && "hidden"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Hamburger */}
      <div className="flex gap-7 justify-end items-center md:hidden text-white relative">
        <button name="search-small" onClick={handleSearch} className="text-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
        <div className="relative">
          <span onClick={openCartModal} className="cursor-pointer text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-cart"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          </span>
          <div
            className={`absolute w-1.2 h-1.2 -top-1 -right-1 bg-red-600 rounded-full p-1 ${
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
