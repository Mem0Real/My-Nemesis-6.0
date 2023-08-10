"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { getCookie, hasCookie } from "cookies-next";
import Image from "next/image";

export default function MultiLayerParallax() {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme);

  useEffect(() => {
    setCurrentTheme(hasCookie("Theme") ? getCookie("Theme") : "light");
    console.log(currentTheme);
  }, [theme]);

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "500%"]);

  return (
    <div
      ref={container}
      className="w-full h-screen overflow-hidden relative grid place-items-center"
    >
      <motion.h1
        className="font-bold text-black dark:text-white text-4xl sm:text-6xl relative z-10"
        style={{ y: textY }}
      >
        Ethio Machineries
      </motion.h1>

      {currentTheme === "light" && (
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
          animate={currentTheme === "light" ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            fill
            alt="light"
            className="object-contain object-bottom"
            src="/images/Day.png"
          />
        </motion.div>
      )}
      {currentTheme === "dark" && (
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
          animate={currentTheme === "dark" ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            fill
            alt="dark"
            className="object-contain object-bottom"
            src="/images/Night.png"
          />
        </motion.div>
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
