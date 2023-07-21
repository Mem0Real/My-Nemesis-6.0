"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useIcons } from "../utils/CustomIcons";
import { motion, AnimatePresence } from "framer-motion";

const useThemeSwitcher = () => {
  const [mode, setMode] = useState("");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMode(theme);
  }, [theme]);

  return [mode, setTheme];
};

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useThemeSwitcher();
  const { DarkIcon, LightIcon } = useIcons();

  return (
    <AnimatePresence>
      <motion.button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 2, opacity: 0 }}
        initial={{ opacity: 0 }}
      >
        {theme === "light" ? DarkIcon : LightIcon}
      </motion.button>
    </AnimatePresence>
  );
};
