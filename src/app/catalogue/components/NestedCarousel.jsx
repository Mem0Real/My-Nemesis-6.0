"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import { Suspense } from "react";

import { useIcons } from "@/app/utils/CustomIcons";
import { AnimatePresence, motion } from "framer-motion";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function NestedCarousel({ children }) {
  const [activeSlide, setActiveSlide] = useState();

  const { RightIcon, LeftIcon } = useIcons();

  const settings = {
    init: true,
    draggable: false,
    swipe: false,
    lazyLoad: "progressive",
    infinite: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    slidesToScroll: 1,
    slidesToShow: 1,
    afterChange: (current) => setActiveSlide(current),
  };

  function NextArrow(props) {
    const { onClick, className } = props;
    return (
      <div
        className="absolute -top-[2.6px] bottom-0 grid place-content-center -right-[10px] h-full bg-gradient-to-l from-neutral-100 dark:from-neutral-800 to-neutral-200/20 dark:to-neutral-700/20 cursor-pointer rounded-tr-3xl z-10"
        onClick={onClick}
      >
        <AnimatePresence>
          {!className?.includes("slick-disabled") && (
            <motion.div
              style={{ display: "block" }}
              whileTap={{ scale: 0.6 }}
              whilehover={{ scale: 1.5 }}
              exit={{ opacity: 0 }}
              animate={
                className?.includes("slick-disabled")
                  ? ""
                  : { opacity: 1, transition: { duration: 0.5 } }
              }
            >
              {RightIcon}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  function PrevArrow(props) {
    const { onClick, className } = props;
    return (
      <div
        className="absolute h-full -top-[2.6px] bottom-0 grid place-content-center -left-[12px] bg-gradient-to-r from-neutral-100 dark:from-neutral-800 to-neutral-200/20 dark:to-neutral-700/20 cursor-pointer rounded-tl-3xl z-10"
        onClick={onClick}
      >
        <AnimatePresence>
          {!className?.includes("slick-disabled") && (
            <motion.div
              style={{ display: "block" }}
              whileTap={{ scale: 0.6 }}
              whilehover={{ scale: 1.5 }}
              exit={{ opacity: 0 }}
              animate={
                className?.includes("slick-disabled")
                  ? ""
                  : { opacity: 1, transition: { duration: 0.5 } }
              }
            >
              {LeftIcon}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
  return (
    <div className={`w-[90%] mx-auto`}>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Slider {...settings}>{children}</Slider>
      </Suspense>
    </div>
  );
}
