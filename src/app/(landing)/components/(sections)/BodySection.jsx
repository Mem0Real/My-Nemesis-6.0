"use client";

import styles from "../../styles/body.module.scss";
import { useRef } from "react";

import ShopCategory from "../ShopCategory";
import BestSellers from "../BestSellers";
import Company from "../Company";

import { motion, useScroll, useTransform } from "framer-motion";
import ServiceShow from "../ServiceShow";

export default function BodySection({ products, categories }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 20]);

  const imageX = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <main className=" bg-neutral-100 dark:bg-neutral-800 backdrop-blur-lg">
      <div
        ref={ref}
        className="hidden lg:block relative z-10 h-[200vh] overflow-clip"
      >
        <motion.div
          style={{ scale }}
          className={`${styles.heroBackground} absolute left-0 top-0 grid origin-[50vw_85vh] md:origin-[87%_33%] lg:origin-[93%_40%] gap-2 p-6 pt-12 [grid-template-rows:4fr_1fr]  md:pt-20`}
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
            <div className="mx-auto -mb-7 mt-4 box-content aspect-[5/8] w-[100px] min-w-[100px] origin-[inherit] rounded-full border border-gray-800 dark:border-gray-300 md:my-auto md:-mr-1 md:ml-auto md:w-[150px] md:min-w-[150px]" />
          </div>
        </motion.div>
      </div>

      <Company />
      <BestSellers products={products} />

      <ShopCategory categories={categories} />
      <ServiceShow />
    </main>
  );
}
