"use client";
import { useTheme } from "next-themes";

import { useIcons } from "../utils/CustomIcons";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { setCookie } from "cookies-next";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { DarkIcon, LightIcon } = useIcons();

  useEffect(() => {
    setMounted(true);
  }, []);

  // if (!mounted) {
  //   return null;
  // }

  const variants = {
    show: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "linear",
      },
    },
    hide: {
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "linear",
      },
    },
  };

  const handleThemeToggle = () => {
    const pref = theme === "dark" ? "light" : "dark";
    setTheme(pref);
    setCookie("Theme", pref);
  };
  return (
    <AnimatePresence>
      <motion.button
        onClick={handleThemeToggle}
        animate={mounted ? "show" : "hide"}
        variants={variants}
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
