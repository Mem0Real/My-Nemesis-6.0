"use client";
import React, { useRef } from "react";
import PageWrapper from "../components/PageWrapper";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
const images = ["1.png", "2.png", "3.png", "4.png", "5.png", "5.png"];
const Services = () => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const left = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const right = useTransform(scrollYProgress, [0, 1], [0, 3]);

  return (
    <PageWrapper>
      <div className="flex flex-col items-center gap-20 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 min-h-screen">
        <div className="w-full flex flex-col items-center justify-center py-16 md:py-20 lg:py-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold">
            Services
          </h1>
        </div>
        <div className="min-h-screen w-[95%] mx-auto"></div>
      </div>
    </PageWrapper>
  );
};
const ImageColumn = ({ images, y = 0 }) => {
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
const TextColumn = ({ y = 0 }) => {
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
export default Services;
