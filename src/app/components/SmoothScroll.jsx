"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./smooth.module.scss";

import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import useDimensionHook from "../utils/useDimensionHook";

const images = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
  "8.png",
  "9.png",
  "10.png",
  "11.png",
  "12.png",
];

export default function SmoothScroll() {
  const container = useRef(null);
  const header = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const { height } = useDimensionHook();
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 5]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * -1.5]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 3.5]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * -1]);

  const isInview = useInView(header);

  const variants = {
    show: {
      opacity: 1,
      y: 10,
      transition: {
        duration: 1,
      },
      scale: 1.25,
    },
    hide: { opacity: 0, scale: 1, y: 0, duration: 1 },
  };
  return (
    <main className={`${styles.main} w-[90%] mx-auto`}>
      {/* <div className={styles.spacer}></div> */}

      <motion.div
        ref={header}
        className="flex flex-col items-center justify-center w-full h-96 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500"
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
      <div
        ref={container}
        className={`${styles.gallery} bg-neutral-300 dark:bg-neutral-700`}
      >
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </div>

      <div className={styles.spacer}></div>
    </main>
  );
}

const Column = ({ images, y = 0 }) => {
  return (
    <motion.div className={styles.column} style={{ y }}>
      {images.map((src, index) => {
        return (
          <div key={index} className={styles.imageContainer}>
            <Image
              src={`/images/${src}`}
              alt="image"
              fill
              className="bg-neutral-200 dark:bg-neutral-800 border-2 dark:border-neutral-400 shadow-inner shadow-neutral-800/60 dark:shadow-neutral-200/60"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
              priority
            />
          </div>
        );
      })}
    </motion.div>
  );
};
