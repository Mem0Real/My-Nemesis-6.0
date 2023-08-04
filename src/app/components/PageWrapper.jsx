"use client";
import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
  return (
    <motion.div
      className="min-h-screen bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {children}
    </motion.div>
  );
}
