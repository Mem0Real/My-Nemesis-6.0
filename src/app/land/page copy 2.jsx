"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { useThemeContext } from "@/context/ThemeProvider";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Land() {
  const ref = useRef(null);

  const { update } = useThemeContext();

  const [currentTheme, setCurrentTheme] = useState("");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  useEffect(() => {
    const theme = localStorage.getItem("isDarkTheme");
    if (theme === "false") setCurrentTheme("light");
    else setCurrentTheme("dark");
  }, [update]);
  {
    /* <div className="fixed h-screen w-screen z-0 bg-neutral-100/60 dark:bg-neutral-800/60">
      {currentTheme === "light" ? (
        <Image
          src="/images/Day.png"
          fill
          sizes="(max-width: 768px) 100vw"
          alt="catalogue"
          className="object-cover object-center"
        />
      ) : (
        <Image
          src="/images/Night.png"
          fill
          sizes="(max-width: 768px) 100vw"
          alt="catalogue"
          className="object-cover object-center"
        />
      )}
    </div> */
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

  const size = useWindowSize();

  const useMove = (distance) => {
    return useTransform(scrollYProgress, [0, 1], [0, -distance]);
  };

  const useScale = (scale) => {
    return useTransform(scrollYProgress, [0, 1], [scale, 1]);
  };

  let windowX, windowY, windowScale, bodyX, bodyY, bodyScale;

  if (size.width < 768) {
    windowX = useMove(size.width / 2);
    windowY = useMove(-250);
    windowScale = useScale(8);
  } else if (size.width < 1024) {
    windowX = useMove(size.width / 2);
    windowY = useMove(-350);
    windowScale = useScale(12);
  } else {
    windowX = useMove(size.width - 280);
    windowY = useMove(-150);
    windowScale = useScale(30);
  }

  bodyScale = useScale(12);
  return (
    <div className="">
      <div className="h-[25vh] md:h-[50vh] lg:h-[100vh]"></div>
      <motion.div
        ref={ref}
        className="w-56 h-56 border bg-neutral-100 rounded-xl sticky top-0 float-right my-24"
        initial={{ x: 0 }}
        style={{ x: windowX, y: windowY, scale: windowScale }}
      ></motion.div>
      <motion.div
        className="flex justify-end items-center"
        style={{ scale: bodyScale }}
      >
        <div className="w-96 h-96 rounded-3xl border border-orange-500"></div>
      </motion.div>
      <div className="h-[50vh] md:h-screen lg:h-[200vh]"></div>
    </div>
  );
}
