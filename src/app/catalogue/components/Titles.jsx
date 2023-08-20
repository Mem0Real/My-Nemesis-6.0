"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Titles({ name, className }) {
  return (
    <motion.h1
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{
        delay: 0.5,
        type: "spring",
        stiffness: 150,
      }}
      className={className}
    >
      {name}
    </motion.h1>
  );
}
