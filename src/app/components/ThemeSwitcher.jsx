"use client";
import { useTheme } from "next-themes";

import { useIcons } from "../utils/CustomIcons";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { DarkIcon, LightIcon } = useIcons();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <AnimatePresence>
      <motion.button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 2, opacity: 0 }}
        initial={{ opacity: 0 }}
      >
        {theme === "light" ? (
          <span className="text-blue-950">{DarkIcon}</span>
        ) : (
          <span className="text-yellow-500">{LightIcon}</span>
        )}
      </motion.button>
    </AnimatePresence>
  );
};
