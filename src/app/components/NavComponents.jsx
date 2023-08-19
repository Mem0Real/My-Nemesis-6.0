"use client";

import { useEffect, useState, useRef, createContext, useContext } from "react";
import { usePathname } from "next/navigation";

import { signOut } from "next-auth/react";

import Link from "next/link";

import { useCartContext } from "../cart/CartBase";
import { ThemeSwitcher } from "./ThemeSwitcher";

import { useRouter } from "next/navigation";
import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";

import { motion, AnimatePresence } from "framer-motion";
import { Poppins, Raleway } from "next/font/google";
import { useSearchContext } from "../search/SearchBase";
import { useIcons } from "../utils/CustomIcons";

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

// TODO should create a loading status bar
export default function NavComponents({ session }) {
  const [isOpen, setIsOpen] = useState(false);

  const { openCartModal, newCart } = useCartContext();
  const { handleSearch } = useSearchContext();

  const menuRef = useRef();
  const router = useRouter();
  const path = usePathname();

  const { SearchIcon, CartIcon } = useIcons();

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
    deleteCookie("next-auth.session-token");
    deleteCookie("next-auth.callback-url");
    deleteCookie("accessToken");
    deleteCookie("next-auth.csrf-token");

    // Refresh the page to update the session
    router.refresh();
    router.push("/");
  };

  const links = [
    { href: "/products", label: "Products" },
    { href: "/catalogue", label: "Catalogue" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  const menuVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
    close: {
      y: "-15px",
      opacity: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };
  return (
    <div ref={menuRef} className="w-full">
      {/* Buttons */}
      <div className="hidden md:flex justify-between items-center">
        {/* <SearchInput /> */}
        <button
          className="relative w-44 lg:w-48 flex-initial flex items-center cursor-pointer justify-evenly py-1 rounded-md outline outline-1 hover:outline-2outline-neutral-800 text-zinc-800 bg-zinc-200 dark:outline-neutral-200 dark:text-zinc-200 dark:bg-zinc-800"
          onClick={handleSearch}
        >
          <p className="pr-6 lg:pr-4">Search Products</p>
          <div className="text-base absolute left-1 lg:left-3 top-0 bottom-0 grid place-content-center z-10 text-neutral-800 dark:text-neutral-200">
            {SearchIcon}
          </div>
          <p className="absolute right-2 top-0 bottom-0 grid place-content-center text-sm text-neutral-600 dark:text-neutral-400 italic">
            Ctrl K
          </p>
        </button>
        <div className="flex justify-end items-center gap-2 md:gap-5 lg:gap-6 md:px-2">
          <ThemeSwitcher />

          {links.map(({ href, label }) => (
            <Link key={label} href={href} className="relative group">
              {path.includes(href) && (
                <motion.span
                  layoutId="active-underline"
                  className="absolute left-0 top-full block h-[2px] w-full bg-neutral-800 dark:bg-neutral-200 mt-0.5"
                />
              )}
              <span
                key={href}
                className="text-sm text-neutral-700 p-1 dark:text-neutral-300 rounded-md backdrop-blur-md transition-all duration-200 ease-in-out hover:text-neutral-900 dark:hover:text-neutral-100 "
              >
                {label}
              </span>
            </Link>
          ))}
          <button
            className={`border-red-800 px-2 py-1 rounded-md cursor-pointer transition-all ease-in-out border-b shadow-sm shadow-red-800/70 hover:shadow-red-500/70 ${
              !session && "hidden"
            }`}
            onClick={handleSignOut}
          >
            Logout
          </button>

          <div className="relative">
            <button
              onClick={openCartModal}
              className="cursor-pointer flex flex-col items-end"
            >
              {CartIcon}
            </button>
            <div
              className={`absolute w-1.2 h-1.2 -top-1 -right-1 bg-red-600 rounded-full p-1 ${
                !newCart && "hidden"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Hamburger */}
      <div className="relative flex gap-7 justify-end items-center md:hidden text-neutral-800 dark:text-neutral-200  px-4 md:px-2 lg:px-8 pt-4">
        <ThemeSwitcher />
        <button
          name="search-small"
          onClick={handleSearch}
          className="text-lg text-neutral-800 dark:text-neutral-200"
        >
          {SearchIcon}
        </button>
        <div className="relative">
          <button onClick={openCartModal} className="cursor-pointer text-lg">
            {CartIcon}
          </button>
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`w-full flex-grow lg:flex lg:items-center lg:w-auto z-50 bg-neutral-100 dark:bg-neutral-800`}
            initial="close"
            animate={isOpen ? "open" : "close"}
            exit="close"
            variants={menuVariants}
          >
            <motion.ul className="text-sm md:hidden block py-5 mt-0 md:mt-9 list-none">
              {links.map(({ href, label }) => (
                <motion.li key={href}>
                  <Link
                    href={href}
                    className="block mt-4 border-b lg:inline-block lg:mt-0 text-white-200 mr-4 ml-10 hover:border-b border-neutral-800 dark:border-neutral-200 border-spacing-y-2 py-3 font-medium text-black dark:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
              {session && (
                <motion.li className="relative py-6">
                  <button
                    onClick={handleSignOut}
                    className="block absolute right-4 top-2 z-10 mt-4 border rounded-xl lg:inline-block lg:mt-0 text-white-200 mr-4 ml-10 hover:border-b border-red-700 border-spacing-y-2 py-2 px-3 font-medium"
                  >
                    Logout
                  </button>
                </motion.li>
              )}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const useFunctionsContext = () => useContext(FunctionsContext);
