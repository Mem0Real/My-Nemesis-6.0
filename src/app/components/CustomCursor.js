"use client";
import styles from "./styles.module.scss";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function CustomCursor({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [[rotateX, rotateY, scaleX, scaleY], setMovementAnimation] = useState([
    0, 0, 1, 1,
  ]);

  const containerRef = useRef();

  const onMouseMove = (e) => {
    const { left, top } = containerRef.current.getBoundingClientRect();
    const newX = e.clientX;
    const newY = e.clientY;
    const absDeltaX = Math.abs(mousePosition.x - newX);
    const absDeltaY = Math.abs(mousePosition.y - newY);
    setMovementAnimation([
      absDeltaY * 2.5,
      absDeltaX * 2.5,
      1 - absDeltaY * 0.005,
      1 - absDeltaX * 0.005,
    ]);
    setMousePosition({ x: newX, y: newY });
  };
  return (
    <div
      className={styles.customCursor}
      ref={containerRef}
      onMouseMove={onMouseMove}
    >
      {children}

      <motion.div
        className={`hidden md:block ${styles.cursor} shadow-inner shadow-red-800 border border-neutral-800 dark:border-neutral-200 opacity-60 w-20 h-20 backdrop-blur-sm z-50`}
        animate={{
          translateX: -32,
          translateY: -32,
          rotateX,
          rotateY,
          scaleX,
          scaleY,
          left: mousePosition.x,
          top: mousePosition.y,
          transition: {
            duration: 0.1,
            ease: "circInOut",
          },
        }}
      />
    </div>
  );
}
