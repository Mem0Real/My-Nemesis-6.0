"use client";

import React, { useRef } from "react";

import { motion, useInView } from "framer-motion";

export default function Motto() {
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
    <div className="w-screen bg-neutral-100 dark:bg-neutral-800 backdrop-blur-lg  shadow-lg shadow-neutral-800/50 dark:shadow-neutral-200/50">
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
    </div>
  );
}
