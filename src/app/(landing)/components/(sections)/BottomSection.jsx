"use client";

import styles from "../../styles/body.module.scss";
import { useRef } from "react";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export default function BottomSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 12]);

  // const imageX = useTransform(scrollYProgressSpring, [0, 1], [50, 0]);
  // const imageXCalc = useMotionTemplate`max(0px, calc(${imageX}% + calc(${imageX}vw - 300px)))`;

  return (
    <main>
      <div ref={ref} className="relative z-10 h-[200vh] overflow-clip">
        <motion.div
          style={{ scale }}
          className={`${styles.heroBackground} sticky left-0 top-0 grid h-screen origin-[50%_70%] gap-2 p-6 pt-12 [grid-template-rows:4fr_1fr] md:origin-[7%_38%] md:pt-20`}
        >
          <div
            className={`${styles.windowMask} flex flex-col md:flex-row rounded-3xl bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 p-12`}
          >
            <div className="mx-auto -mb-7 mt-4 box-content aspect-[5/8] w-[100px] min-w-[100px] rounded-full border-[2px] border-gray-800 dark:border-gray-300 md:my-auto md:-ml-1 md:mr-auto md:w-[150px] md:min-w-[150px]" />
            <div className="flex h-full flex-col py-12 -mt-12 gap-12">
              <h1 className="mb-5 max-w-[12ch] text-4xl font-bold leading-[0.85] md:my-auto md:text-6xl xl:text-7xl">
                For all your purchase needs
              </h1>
              <p className="text-lg md:text-3xl">We are here for you!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
