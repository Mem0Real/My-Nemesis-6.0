"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import { useTheme } from "next-themes";

export default function CarouselHolder({ children }) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const { theme } = useTheme();

  return (
    <div
      className="group mx-auto w-[95%] relative rounded-xl border border-white/10 bg-gradient-to-r from-white/40 to-white/80 dark:from-black/40 dark:to-neutral-600/80 shadow-inner shadow-black/40 backdrop-blur-sm"
      onMouseMove={handleMouseMove}
    >
      {theme === "dark" ? (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
                radial-gradient(
                750px circle at ${mouseX}px ${mouseY}px,
                rgba(218, 165, 32, 0.25),
                transparent 90%
                )
            `,
          }}
        />
      ) : (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
                radial-gradient(
                750px circle at ${mouseX}px ${mouseY}px,
                rgba(40, 40, 150, 0.25),
                transparent 90%
                )
            `,
          }}
        />
      )}
      {children}
    </div>
  );
}
