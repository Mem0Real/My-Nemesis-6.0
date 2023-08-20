"use client";

import { useState, useEffect, useContext } from "react";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useRef } from "react";
// import { useTheme } from "next-themes";
import Image from "next/image";
import { useThemeContext } from "@/context/ThemeProvider";

export default function MultiLayerParallax() {
  // const { theme } = useTheme();
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
      {/* <motion.div
        className="absolute inset-0 z-0"
        style={
          theme === "light"
            ? {
                backgroundImage: `url(/images/Day.png)`,
                backgroundPosition: "bottom",
                backgroundSize: "cover",
                y: backgroundY,
              }
            : {
                backgroundImage: `url(/images/Night.png)`,
                backgroundPosition: "bottom",
                backgroundSize: "cover",
                y: backgroundY,
              }
        }
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        animate={{
          opacity: 1,
          backgroundImage:
            theme === "light"
              ? "url(/images/Day.png)"
              : "url(/images/Night.png)",
          transition: { duration: 1, ease: "linear" },
        }}
      >
        <Image
              fill
              alt="light"
              className="
              object-bottom"
              src="/images/Day.png"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
              quality={100}
            />
      </motion.div> */}

      <AnimatePresence>
        {currentTheme === "light" ? (
          <motion.div
            className="absolute inset-0 z-0"
            style={{ y: backgroundY }}
          >
            <Image
              fill
              alt="light"
              className="object-cover object-bottom"
              src="/images/Day.png"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
              priority={true}
            />
          </motion.div>
        ) : (
          <motion.div
            className="absolute inset-0 z-0"
            style={{ y: backgroundY }}
          >
            <Image
              fill
              alt="dark"
              className="object-cover object-top"
              src="/images/Night.png"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
              priority={true}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* <div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage: `url(/images/Building.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      ></div> */}

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
