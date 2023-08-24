"use client";

import React, { useState, useEffect, useRef } from "react";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import Image from "next/image";
import { useThemeContext } from "@/context/ThemeProvider";

export default function MultiLayerParallax() {
  const { update } = useThemeContext();

  const [currentTheme, setCurrentTheme] = useState("");

  useEffect(() => {
    const theme = localStorage.getItem("isDarkTheme");
    if (theme === "false") setCurrentTheme("light");
    else setCurrentTheme("dark");
  }, [update]);

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const size = useWindowSize();

  const isMobile = size.width < 768;

  let bgSpeed, textSpeed;

  if (isMobile) {
    bgSpeed = "80%";
    textSpeed = "1000%";
  } else {
    bgSpeed = "100%";
    textSpeed = "500%";
  }

  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
  }

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", bgSpeed]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", textSpeed]);

  return (
    <div
      ref={container}
      className="w-full h-screen overflow-hidden relative grid place-items-center"
    >
      <motion.h1
        className="font-bold text-neutral-800 dark:text-neutral-200 text-4xl sm:text-6xl relative z-10"
        style={{ y: textY }}
      >
        My Nemesis
      </motion.h1>

      <div className="absolute inset-0 z-10">
        <Image
          fill
          alt="dark"
          className="object-cover object-bottom"
          src="/images/Building.png"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
          quality={100}
          priority
        />
      </div>
    </div>
  );
}
