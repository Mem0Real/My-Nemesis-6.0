"use client";

import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { useThemeContext } from "@/context/ThemeProvider";

export default function Skeleton({ className }) {
  const [currentTheme, setCurrentTheme] = useState();
  const [color, setColor] = useState("#C0C0C0");

  const themeCtx = useThemeContext();

  useEffect(() => {
    const theme = localStorage.getItem("isDarkTheme");
    if (theme === "false") {
      setCurrentTheme("light");
      setColor("#C0C0C0");
    } else {
      setCurrentTheme("dark");
      setColor("#808080");
    }
  }, [themeCtx.update]);

  const gradient = {
    initial: `radial-gradient(circle at -500px 30px, ${color}, transparent`,
    final: `radial-gradient(circle at 1000px 30px, ${color}, transparent`,
  };
  const loadingVariants = {
    animationOne: {
      background: [gradient.initial, gradient.final, gradient.initial],

      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1,
      },
    },
  };
  return (
    <motion.div
      className={`rounded ${className}`}
      variants={loadingVariants}
      animate="animationOne"
      style={{
        background: gradient.initial,
      }}
    ></motion.div>
  );
}
