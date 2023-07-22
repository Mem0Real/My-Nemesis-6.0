"use client";

import { useTheme } from "next-themes";

import { useIcons } from "../utils/CustomIcons";
import { motion, AnimatePresence } from "framer-motion";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
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
