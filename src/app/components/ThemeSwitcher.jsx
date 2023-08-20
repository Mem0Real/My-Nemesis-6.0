"use client";

import { useState, useEffect } from "react";
import { useThemeContext } from "@/context/ThemeProvider";
import { useIcons } from "../utils/CustomIcons";

import { AnimatePresence, motion } from "framer-motion";

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState();

  const themeCtx = useThemeContext();

  useEffect(() => {
    const theme = localStorage.getItem("isDarkTheme");
    if (theme === "false") setCurrentTheme("light");
    else setCurrentTheme("dark");
  }, [themeCtx.update]);

  function toggleThemeHandler() {
    themeCtx.toggleThemeHandler();
  }

  const { LightIcon, DarkIcon } = useIcons();

  return (
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
  );
}
