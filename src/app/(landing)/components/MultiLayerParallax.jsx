"use client";

import { useState, useEffect } from "react";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useRef } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function MultiLayerParallax() {
  const { theme } = useTheme();

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
        Ethio Machineries
      </motion.h1>

      {theme === "light" && (
        <AnimatePresence>
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              // backgroundImage: `url(/images/Day.png)`,
              // backgroundPosition: "bottom",
              // backgroundSize: "cover",
              y: backgroundY,
            }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={theme === "light" ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              fill
              alt="light"
              className="object-cover object-bottom"
              src="/images/Day.png"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
              quality={100}
            />
          </motion.div>
        </AnimatePresence>
      )}
      {theme === "dark" && (
        <AnimatePresence>
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              // backgroundImage: `url(/images/Night.png)`,
              // backgroundPosition: "bottom",
              // backgroundSize: "cover",
              y: backgroundY,
            }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={theme === "dark" ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              fill
              alt="dark"
              className="object-cover object-bottom"
              src="/images/Night.png"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
              quality={100}
            />
          </motion.div>
        </AnimatePresence>
      )}

      <div className="absolute inset-0 z-20">
        <Image
          fill
          alt="dark"
          className="object-contain object-bottom"
          src="/images/Building.png"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
          quality={100}
        />
      </div>
    </div>
  );
}
