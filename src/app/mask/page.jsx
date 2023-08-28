"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Image({ id }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section
      className="h-screen flex justify-center items-center relative snap-center"
      style={{ perspective: "500px" }}
    >
      <div
        ref={ref}
        className="w-[300px] h-[400px] max-h-[90vh] relative m-5 overflow-hidden"
      >
        <img
          src={`/images/${id}.png`}
          alt="A London skyscraper"
          className="absolute inset-0 w-full h-full"
        />
      </div>
      <motion.h2
        style={{ y }}
        className="absolute text-5xl "
      >{`#00${id}`}</motion.h2>
    </section>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="scroll-smooth snap-y snap-mandatory pt-24">
      {[1, 2, 3, 4, 5].map((image) => (
        <React.Fragment key={image}>
          <Image id={image} />
        </React.Fragment>
      ))}
      <motion.div
        className="fixed left-0 right-0 h-2 bg-neutral-100 bottom-[100px]"
        style={{ scaleX }}
      />
    </div>
  );
}
