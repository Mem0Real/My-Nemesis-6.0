"use client";

import { motion } from "framer-motion";

export default function Skeleton({ className }) {
  const gradient = {
    initial:
      "radial-gradient(circle at -500px 30px, rgb(100 100 100), transparent",
    final:
      "radial-gradient(circle at 1000px 30px, rgb(100 100 100), transparent",
  };
  const loadingVariants = {
    animationOne: {
      background: [gradient.initial, gradient.final, gradient.initial],

      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };
  return (
    <motion.div
      className={`rounded ${className}`}
      variants={loadingVariants}
      animate="animationOne"
      style={{
        background: gradient.initial,
      }}
    ></motion.div>
  );
}
