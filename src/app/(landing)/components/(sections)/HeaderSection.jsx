"use client";

import { useEffect, useRef } from "react";

import { motion, useInView } from "framer-motion";

import MultiLayerParallax from "../MultiLayerParallax";
// import ScrollingImages from "./ScrollingImages";

import Lenis from "@studio-freight/lenis";

export default function HeaderSection() {
  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  const header = useRef(null);

  const isInview = useInView(header);

  const variants = {
    show: {
      opacity: 1,
      y: 10,
      transition: {
        duration: 1,
      },
      scale: 1.1,
    },
    hide: { opacity: 0, scale: 1, y: 0, duration: 1 },
  };

  return (
    <main className=" bg-neutral-200 dark:bg-neutral-800">
      <div className="overflow-clip">
        <MultiLayerParallax />
      </div>

      <motion.div
        ref={header}
        className="flex flex-col items-center justify-center w-full h-80 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500"
        initial="hide"
        animate={isInview ? "show" : "hide"}
        exit="hide"
        variants={variants}
      >
        <h1 className="font-semibold text-4xl text-center space-y-4 capitalize">
          Proudly serving the community <br />
          since 2005!
        </h1>
      </motion.div>
    </main>
  );
}
