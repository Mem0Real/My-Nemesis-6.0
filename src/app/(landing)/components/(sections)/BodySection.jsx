"use client";

import styles from "../../styles/body.module.scss";
import { useRef } from "react";

import ShopCategory from "../ShopCategory";
import BestSellers from "../BestSellers";
import Company from "../Company";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import ServiceShow from "../ServiceShow";

export default function BodySection({ products, categories }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 12]);

  const imageX = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const imageXCalc = useMotionTemplate`max(0px, calc(${imageX}% + calc(${imageX}vw - 300px)))`;

  return (
    <main>
      <div
        ref={ref}
        className="hidden lg:block relative z-10 h-[200vh] overflow-clip"
      >
        <motion.div
          style={{ scale }}
          className={`${styles.heroBackground} sticky left-0 top-0 grid h-screen sm:origin-[50%_80%] origin-[50%_60%] md:origin-[87%_33%] lg:origin-[93%_35%] gap-2 p-6 pt-12 [grid-template-rows:4fr_1fr]  md:pt-20`}
        >
          <div
            className={`flex flex-col rounded-3xl bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 p-12 md:flex-row`}
          >
            <div className="flex h-full flex-col py-12 -mt-12 gap-12">
              <h1 className="mb-5 max-w-[12ch] text-4xl font-bold leading-[0.85] md:my-auto md:text-6xl xl:text-7xl">
                Browse to your heart&apos;s desire!
              </h1>
              <p className="text-lg md:text-3xl">
                From the wide variety of products our company offers, we can
                guarantee that you will find what you are looking for.
              </p>
            </div>
            <div className="mx-auto -mb-7 mt-4 box-content aspect-[5/8] w-[100px] min-w-[100px] rounded-full border-[2px] border-gray-800 dark:border-gray-300 md:my-auto md:-mr-1 md:ml-auto md:w-[150px] md:min-w-[150px]" />
          </div>
        </motion.div>
      </div>
      {/* <div className="mt-[-200vh] h-[200vh] bg-neutral-200 dark:bg-neutral-800 pb-20">
        <motion.span
          style={{ x: imageXCalc }}
          className="sticky top-1/2 mx-auto block aspect-video w-[1600px] max-w-[90%] rounded-[60px] bg-gray-300 shadow-2xl md:top-1/4"
        />
      </div> */}

      <Company />
      <BestSellers products={products} />

      <ShopCategory categories={categories} />
      <ServiceShow />
    </main>
  );
}
