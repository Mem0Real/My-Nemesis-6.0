"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { motion, useInView } from "framer-motion";

import MultiLayerParallax from "./MultiLayerParallax";
import ScrollingImages from "./ScrollingImages";

import { useIcons } from "../utils/CustomIcons";
import Lenis from "@studio-freight/lenis";

const Header = () => {
  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  const introHeaderVariants = {
    hide: {
      opacity: 0,
      y: -50,
    },

    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2,
      },
    },
  };

  const introPictureVariants = {
    hide: {
      opacity: 0,
      x: 250,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      },
    },
  };

  const { DeliveryTruckIcon, HourIcon, DiscountIcon, MaintainanceIcon } =
    useIcons();
  const header = useRef(null);

  const isInview = useInView(header);

  const variants = {
    show: {
      opacity: 1,
      y: 10,
      transition: {
        duration: 1,
      },
      scale: 1.1,
    },
    hide: { opacity: 0, scale: 1, y: 0, duration: 1 },
  };

  return (
    <main className=" bg-neutral-200 dark:bg-neutral-800">
      <MultiLayerParallax />

      {/* <ScrollingImages /> */}

      <motion.div
        ref={header}
        className="flex flex-col items-center justify-center w-full h-80 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500"
        initial="hide"
        animate={isInview ? "show" : "hide"}
        exit="hide"
        variants={variants}
      >
        <h1 className="font-semibold text-4xl text-center space-y-4 capitalize">
          Proudly serving the community <br />
          since 2005!
        </h1>
      </motion.div>

      <div className="bg-neutral-100 dark:bg-neutral-900 min-h-64 px-6 lg:px-12 py-12 flex flex-col md:flex-row flex-wrap items-center justify-center w-[95%] mx-auto gap-12 lg:my-6">
        <motion.div
          className="flex items-center justify-between w-full md:w-fit text-neutral-800 dark:text-neutral-200"
          initial={{ x: -50 }}
          exit={{ x: -50 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {DeliveryTruckIcon}
          <p>Shipping</p>
        </motion.div>
        <motion.div
          className="flex items-center justify-between w-full md:w-fit text-neutral-800 dark:text-neutral-200"
          initial={{ x: -150 }}
          exit={{ x: -150 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {HourIcon}
          <p>Available 24/7</p>
        </motion.div>
        <motion.div
          className="flex items-center justify-between w-full md:w-fit text-neutral-800 dark:text-neutral-200"
          initial={{ x: -250 }}
          exit={{ x: -250 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.7 }}
        >
          {DiscountIcon}
          <p>Low Prices guaranteed</p>
        </motion.div>
        <motion.div
          className="flex items-center justify-between w-full md:w-fit text-neutral-800 dark:text-neutral-200"
          initial={{ x: -350 }}
          exit={{ x: -350 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          {MaintainanceIcon}
          <p>On site installation</p>
        </motion.div>
      </div>
    </main>
  );
};

export default Header;
