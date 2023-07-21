"use client";

import { useState, useEffect, createContext, useContext } from "react";
import dynamic from "next/dynamic";

const SearchModal = dynamic(() => import("./(searchModal)/SearchModal"));
import { motion, AnimatePresence } from "framer-motion";

const SearchContext = createContext({});
export default function SearchBase({ children }) {
  const [searchModal, showSearchModal] = useState(false);

  useEffect(() => {
    if (searchModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [searchModal]);
  const handleSearch = () => {
    showSearchModal(true);
  };

  const closeSearch = () => {
    showSearchModal(false);
  };

  const variants = {
    open: {
      opacity: 1,
      display: "flex",
    },
    close: {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    },
  };
  return (
    <SearchContext.Provider value={{ handleSearch, closeSearch }}>
      {children}
      <AnimatePresence>
        {searchModal && (
          <motion.div
            key="innerCartM"
            initial={"close"}
            animate={searchModal ? "open" : "close"}
            variants={variants}
            exit={"close"}
            className={`fixed top-0 bottom-0 right-0 left-0 z-10 bg-black/50 backdrop-blur-sm  flex ${
              searchModal ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <SearchModal searchModal={searchModal} closeSearch={closeSearch} />
          </motion.div>
        )}
      </AnimatePresence>
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => useContext(SearchContext);
