"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { useTheme } from "next-themes";

export default function MultiLayerParallax() {
  const { theme } = useTheme();

  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "500%"]);

  return (
    <div className="w-full h-screen overflow-hidden relative grid place-items-center">
      <motion.h1
        className="font-bold text-black dark:text-white text-7xl md:text-6xl relative z-10"
        style={{ y: textY }}
      >
        Ethio Machineries
      </motion.h1>

      {theme === "light" ? (
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(/images/Day.png)`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: backgroundY,
          }}
        ></motion.div>
      ) : (
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(/images/Night.png)`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: backgroundY,
          }}
        ></motion.div>
      )}

      <div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage: `url(/images/Building.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
}
