"use client";
import styles from "./styles.module.scss";
import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { useIcons } from "@/app/utils/CustomIcons";

export default function CustomCursor({ children }) {
  //if user is hovering an icon, cursor locks at it

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [[rotateX, rotateY, scaleX, scaleY], setMovementAnimation] = useState([
    0, 0, 1, 1,
  ]);

  const containerRef = useRef();

  const { BlackCursor } = useIcons();

  // const onMouseMove = (e) => {
  //   const { left, top } = containerRef.current.getBoundingClientRect();
  //   const newX = e.clientX - left;
  //   const newY = e.clientY - top;
  //   const absDeltaX = Math.abs(mousePosition.x - newX);
  //   const absDeltaY = Math.abs(mousePosition.y - newY);
  //   setMovementAnimation([
  //     absDeltaX * 0.5,
  //     absDeltaY * 0.5,
  //     1 - absDeltaY * 0.005,
  //     1 - absDeltaX * 0.005,
  //   ]);
  //   setMousePosition({ x: newX, y: newY });
  // };

  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     console.log(e.clientX, e.clientY);
  //     setMousePosition({ x: e.clientX, y: e.clientY });
  //   };
  //   const watchScroll = () => {
  //     window.addEventListener("mousemove", handleMouseMove);
  //   };

  //   watchScroll();
  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, []);

  const onMouseMove = (e) => {
    const { left, top } = containerRef.current.getBoundingClientRect();
    const newX = e.clientX;
    const newY = e.clientY;
    const absDeltaX = Math.abs(mousePosition.x - newX);
    const absDeltaY = Math.abs(mousePosition.y - newY);
    setMovementAnimation([
      absDeltaX * 2.5,
      absDeltaY * 1,
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
        className={`${styles.cursor} shadow-inner shadow-red-800 border border-neutral-800 dark:border-neutral-200 opacity-60 w-16 h-16 backdrop-blur-sm z-50`}
        animate={{
          translateX: -29,
          translateY: -29,
          rotateX,
          rotateY,
          scaleX,
          scaleY,
          left: mousePosition.x,
          top: mousePosition.y,
          transition: {
            duration: 0.1,
            ease: "linear",
          },
        }}
      />
    </div>
  );
}
