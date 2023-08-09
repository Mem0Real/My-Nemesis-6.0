"use client";
import React from "react";
import { motion } from "framer-motion";

const AnimatedLoader = () => {
  const text = "My Nemesis";
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.04 * i,
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      // y: 0,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      // y: -20,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        repeat: Infinity,
      },
    },
  };
  return (
    <motion.div
      className="overflow-hidden flex text-2xl"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span key={index} className="mr-2" variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedLoader;
