import { useState, useEffect, useRef, createContext, useContext } from "react";
import { useRouter } from "next/navigation";

import { getAll } from "../searchActions";

import filterData from "@/app/utils/filterData";

import Categories from "./(searchData)/Categories";
import Parents from "./(searchData)/Parents";
import Children from "./(searchData)/Children";
import Items from "./(searchData)/Items";

import { SearchOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";

const SearchDataContext = createContext({});

export default function SearchModal({ searchModal, closeSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchWord, setSearchWord] = useState("");

  const [content, setContent] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const modalRef = useRef();

  useEffect(() => {
    if (searchModal) {
      async function getter() {
        setLoading(() => true);
        const res = await getAll();
        setLoading(() => false);
        setData(() => res);
      }

      getter();
    }
  }, [searchModal]);

  useEffect(() => {
    let handler = (e) => {
      if (!modalRef.current.contains(e.target)) {
        closeSearch();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (loading) {
      setContent(
        <div className="flex flex-col h-36 items-center justify-center">
          <h1 className="text-base text-neutral-200">Loading...</h1>
        </div>
      );
    } else {
      if (data) {
        const { firstArray, secondArray, thirdArray, fourthArray } = filterData(
          searchWord,
          data
        );

        if (
          !isObjEmpty(firstArray) ||
          !isObjEmpty(secondArray) ||
          !isObjEmpty(thirdArray) ||
          !isObjEmpty(fourthArray)
        ) {
          setContent(
            <div className="flex flex-col gap-6">
              {firstArray && !isObjEmpty(firstArray) && (
                <Categories>{firstArray} </Categories>
              )}
              {secondArray && !isObjEmpty(secondArray) && (
                <Parents>{secondArray}</Parents>
              )}
              {thirdArray && !isObjEmpty(thirdArray) && (
                <Children>{thirdArray}</Children>
              )}
              {fourthArray && !isObjEmpty(fourthArray) && (
                <Items>{fourthArray}</Items>
              )}
            </div>
          );
        } else {
          setContent(
            <div className="flex flex-col items-center justify-center gap-6 h-36">
              <h1 className="text-base italic">No result</h1>
            </div>
          );
        }
      }
    }
  }, [searchWord, loading, data]);

  const isObjEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const handleChange = (e) => {
    setSearchWord(() => e.target.value.toLowerCase());
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeSearch();
    setSearchQuery(searchQuery.toLowerCase());
    router.push(`/search?q=${searchQuery}`);
  };

  const variants = {
    searchData: {
      opacity: 1,
    },
    noSearchData: {
      opacity: 0,
    },
  };

  return (
    <section
      className="h-fit mt-12 w-[90%] sm:w-[85%] md:w-[70%] lg:w-[60%] mx-auto overflow-y-scroll no-scrollbar rounded-lg bg-neutral-900"
      ref={modalRef}
    >
      <header className="pb-4 relative">
        <button
          name="close-add-modal"
          type="button"
          className="absolute top-3 md:top-0 right-5 text-white bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center z-10"
          data-modal-hide="authentication-modal"
          onClick={() => closeSearch()}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="relative flex items-center w-[90%] mx-auto">
          <SearchOutlined
            className="absolute left-0 top-0 bottom-0 grid place-content-center"
            onClick={handleSubmit}
          />
          <div className="w-full border-b border-neutral-600/60">
            <input
              autoFocus={searchModal}
              type="text"
              value={searchQuery || ""}
              className="ps-6 py-3 w-full flex-1 text-lg bg-transparent focus:border-none focus:outline-none"
              placeholder="Search products..."
              onChange={handleChange}
            />
          </div>
        </div>
      </header>
      <main>
        <AnimatePresence>
          {searchQuery && (
            <SearchDataContext.Provider value={{ data }}>
              <motion.div
                className="mt-6 h-56 overflow-y-scroll overflow-x-hidden no-scrollbar text-start"
                animate={searchQuery ? "searchData" : "noSearchData"}
                initial={"noSearchData"}
                exit={"noSearchData"}
                variants={variants}
              >
                {content}
              </motion.div>
            </SearchDataContext.Provider>
          )}
        </AnimatePresence>
      </main>
    </section>
  );
}
export const useSearchDataContext = () => useContext(SearchDataContext);
