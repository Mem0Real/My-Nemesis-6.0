"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex flex-col w-full justify-center items-center min-h-screen bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 py-16 md:py-20 lg:py-24">
      <div className="w-full flex flex-col items-center justify-center py-8 md:py-10 lg:py-12 mb-2 shadow-xl shadow-blue-600/20 dark:shadow-blue-400/10 text-neutral-800 dark:text-neutral-200">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight italic">
          Catalogue
        </h1>
      </div>
      <motion.div
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
      />
    </div>
  );
}
