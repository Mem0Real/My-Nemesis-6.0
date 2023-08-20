"use client";

import { useState, useEffect, useContext } from "react";
import MyThemeContext from "@/store/MyThemeContextProvider";
import { useIcons } from "../utils/CustomIcons";

import { AnimatePresence, motion } from "framer-motion";

export default function Toggler() {
  const [currentTheme, setCurrentTheme] = useState();

  const themeCtx = useContext(MyThemeContext);

  useEffect(() => {
    const theme = localStorage.getItem("isDarkTheme");
    if (theme === "true") setCurrentTheme("dark");
    else setCurrentTheme("light");
  }, [themeCtx.update]);

  function toggleThemeHandler() {
    themeCtx.toggleThemeHandler();
  }

  const { LightIcon, DarkIcon } = useIcons();

  return (
    <>
      {/* <button
        type="button"
        className="py-1 sm:py-2.5 px-2 sm:px-5 mr-2 bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black rounded"
        onClick={toggleThemeHandler}
      >
        Toggle Theme
      </button> */}
      <AnimatePresence>
        <motion.button
          onClick={toggleThemeHandler}
          whileTap={{ scale: 2, opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {currentTheme === "light" ? (
            <span className="text-blue-950">{DarkIcon}</span>
          ) : (
            <span className="text-yellow-500">{LightIcon}</span>
          )}
        </motion.button>
      </AnimatePresence>
    </>
  );
}
