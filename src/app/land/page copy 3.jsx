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
    windowX = useMove(size.width / 2 - 80);
    windowY = useMove(-150);
    windowScale = useScale(20);
  } else if (size.width < 1024) {
    windowX = useMove(size.width - 280);
    windowY = useMove(-150);
    windowScale = useScale(30);
  } else {
    windowX = useMove(size.width - 280);
    windowY = useMove(-150);
    windowScale = useScale(30);
  }

  bodyScale = useScale(24);
  return (
    <div className="">
      <div className="h-[25vh] md:h-[50vh] lg:h-[100vh]"></div>
      <motion.div
        ref={ref}
        className="w-[150px] h-60 bg-neutral-200 dark:bg-neutral-800 border-[2px] border-gray-800 dark:border-gray-300  rounded-full sticky top-0 float-right my-24 z-10"
        initial={{ x: 0 }}
        style={{ x: windowX, y: windowY, scale: windowScale }}
      ></motion.div>
      <div className="md:hidden h-[50vh]"></div>
      <motion.div
        className="flex justify-end items-center pt-12 z-0"
        style={{ scale: bodyScale, y: "8em", x: size.width / 6 }}
      >
        <div className="flex h-full flex-col py-12 -mt-12 gap-12">
          <h1 className="mb-5 max-w-[12ch] font-bold leading-[0.85] md:my-auto text-6xl xl:text-7xl">
            For all your purchase needs
          </h1>
          <p className="text-3xl">We are here for you!</p>
        </div>
      </motion.div>
      <div className="h-[100vh]"></div>
    </div>
  );
}
