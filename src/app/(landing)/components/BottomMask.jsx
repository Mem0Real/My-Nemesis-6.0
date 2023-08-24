"use client";

import styles from "../styles/mask.module.scss";
import React, { useState, useEffect, useRef } from "react";

import { motion, useScroll, useTransform } from "framer-motion";

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function useScale(value, size) {
  return useTransform(value, [0, 1], [size, 1]);
}

function useMove(value, distance) {
  return useTransform(value, [0, 1], [distance, -distance]);
}
export default function BottomMask() {
  const ref = useRef(null);

  const size = useWindowSize();

  const isMobile = size.width <= 768;

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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  let scale, imageX;

  const scaleTransform = useTransform(scrollYProgress, [0, 1], [20, 1]);
  const imageTransform = useTransform(scrollYProgress, [0, 1], [100, 0]);

  if (isMobile) {
    scale = scaleTransform;
    imageX = imageTransform;
  } else {
    scale = scaleTransform;
    imageX = imageTransform;
  }

  return (
    <main className=" bg-neutral-100 dark:bg-neutral-800 backdrop-blur-lg">
      <div ref={ref} className="relative z-10 h-[180vh] overflow-clip">
        <motion.div
          style={{ scale }}
          className={`${styles.heroBackground} absolute right-0 bottom-0 grid w-screen h-screen gap-2 p-6 pt-20 [grid-template-rows:4fr_1fr] origin-[50%_40%] md:origin-[16%_48%] lg:origin-[8%_48%]`}
        >
          <div
            className={`relative flex flex-col md:flex-row justify-end rounded-3xl bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 p-12`}
          >
            <motion.div className="mx-auto my-12 box-content aspect-[5/8] w-[100px] min-w-[100px] rounded-full border-[2px] border-gray-800 dark:border-gray-300 md:my-auto md:-ml-1 md:mr-auto md:w-[150px] md:min-w-[150px]" />
            <div className="flex h-full flex-col py-12 -mt-12 gap-12">
              <h1 className="mb-5 max-w-[12ch] text-4xl font-bold leading-[0.85] md:my-auto md:text-6xl xl:text-7xl">
                For all your purchase needs
              </h1>
              <p className="text-lg md:text-3xl">We are here for you!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
