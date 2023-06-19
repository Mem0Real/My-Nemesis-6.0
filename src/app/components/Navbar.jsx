"use client";

import Image from "next/image";
import Link from "next/link";
import { Poppins, Raleway } from "next/font/google";
import { useState, useEffect, useRef } from "react";
// import SearchInput from "./SearchInput";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Search from "./Search";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  fallback: ["system-ui", "arial"],
});

const raleway = Raleway({
  subsets: ["cyrillic"],
  display: "swap",
});
export const Navbar = () => {
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

  const handleSearch = () => {
    showSearchModal(true);
  };

  const closeSearch = () => {
    showSearchModal(false);
  };

  return (
    <div ref={menuRef}>
      <nav className="w-full md:h-16 h-fit shadow-xl bg-neutral-900 text-white navbar drop-shadow-xl">
        <div className="flex justify-between items-center w-full h-full px-8 py-2 text-sm">
          <Link href="/">
            <div className="flex justify-evenly items-center">
              <div className="relative h-12 w-12">
                <Image
                  src="/images/nemesisLogo.jpg"
                  alt="logo"
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="cursor-pointer rounded-full object-cover"
                  priority
                />
              </div>
              <h1
                className={`lg:px-12 sm:px-6 px-6 hidden sm:block text-xl uppercase font-medium tracking-wider ${raleway.className}`}
              >
                Nemesis
              </h1>
            </div>
          </Link>
          <div className="w-full">
            <ul className="hidden md:flex">
              <div className="flex justify-between items-center w-full">
                <div className="md:px-11">
                  {/* <SearchInput /> */}
                  <button
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
                <div className="flex">
                  <Link href="/collection">
                    <li className="ml-10 underline underline-offset-8 hover:underline-offset-2">
                      Collection
                    </li>
                  </Link>
                  <Link href="/services">
                    <li className="ml-10 underline underline-offset-8 hover:underline-offset-2">
                      Services
                    </li>
                  </Link>
                  <Link href="/about">
                    <li className="ml-10 underline underline-offset-8 hover:underline-offset-2">
                      About
                    </li>
                  </Link>
                  <Link href="/dashboard">
                    <li className="ml-10 underline underline-offset-8 hover:underline-offset-2">
                      Dashboard
                    </li>
                  </Link>
                </div>
              </div>
            </ul>
          </div>
          <div className="flex gap-4 md:hidden text-white">
            <button className="" onClick={handleSearch}>
              <span className="">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
            >
              <svg
                className={`fill-current h-3 w-3 ${
                  isOpen ? "hidden" : "block"
                }`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
              <svg
                className={`fill-current h-3 w-3 ${
                  isOpen ? "block" : "hidden"
                }`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <div
        className={`w-full flex-grow lg:flex lg:items-center lg:w-auto z-20 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ul className="text-sm sm:hidden block bg-neutral-900 py-5 mt-0 md:mt-9">
          <Link href="/collection">
            <li className="block mt-4 border-b lg:inline-block lg:mt-0 text-white-200 mr-4 ml-10 hover:border-b border-white border-spacing-y-2 py-3 font-medium">
              Collection
            </li>
          </Link>
          <Link href="/services">
            <li className="block mt-4 border-b lg:inline-block lg:mt-0 text-white-200 mr-4 ml-10 hover:border-b border-white border-spacing-y-2 py-3 font-medium">
              Services
            </li>
          </Link>
          <Link href="/about">
            <li className="block mt-4 border-b lg:inline-block lg:mt-0 text-white-200 mr-4 ml-10 hover:border-b border-white border-spacing-y-2 py-3 font-medium">
              About
            </li>
          </Link>
          <Link href="/admin">
            <li className="block mt-4 border-b lg:inline-block lg:mt-0 text-white-200 mr-4 ml-10 hover:border-b border-white border-spacing-y-2 py-3 font-medium">
              Admin
            </li>
          </Link>
        </ul>
      </div>

      <Search modal={searchModal} closeSearch={closeSearch} />
    </div>
  );
};

export default Navbar;
