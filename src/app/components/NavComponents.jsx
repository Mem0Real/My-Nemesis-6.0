"use client";

import { useEffect, useState, useRef, createContext, useContext } from "react";

import Link from "next/link";
import { Poppins, Raleway } from "next/font/google";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchModal from "../search/(searchModal)/SearchModal";

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

  const menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = async () => {
    showSearchModal(true);
  };

  const closeSearch = () => {
    showSearchModal(false);
  };

  return (
    <div ref={menuRef} className="w-full">
      {/* Buttons */}
      <div className="w-full">
        <div className="hidden lg:flex justify-between items-center w-full">
          <div className="md:px-11">
            {/* <SearchInput /> */}
            <button
              name="search"
              type="submit"
              onClick={handleSearch}
              className="flex items-center cursor-pointer"
            >
              <p className="px-12 md:pl-4 md:pr-16 py-3 w-full rounded-md sm:py-2 flex-1 text-zinc-200 bg-zinc-800">
                Search products...
              </p>
              <span className="pr-4 -ml-7">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
            </button>
          </div>
          <div className="flex justify-end">
            <Link href="/collection">
              <div className="ml-10 underline underline-offset-8 hover:underline-offset-4">
                Collection
              </div>
            </Link>
            <Link href="/services">
              <div className="ml-10 underline underline-offset-8 hover:underline-offset-4">
                Services
              </div>
            </Link>
            <Link href="/about">
              <div className="ml-10 underline underline-offset-8 hover:underline-offset-4">
                About
              </div>
            </Link>
            <Link href="/dashboard">
              <div className="ml-10 underline underline-offset-8 hover:underline-offset-4">
                Dashboard
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Hamburger */}
      <div className="flex gap-4 justify-end lg:hidden text-white relative">
        <button className="" onClick={handleSearch} name="search">
          <span className="">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
        </button>
        <button
          name="dropdown-btn"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
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
        <ul className="text-sm sm:hidden block bg-neutral-900 py-5 mt-0 md:mt-9 list-none">
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
      </FunctionsContext.Provider>
    </div>
  );
}

export const useFunctionsContext = () => useContext(FunctionsContext);
