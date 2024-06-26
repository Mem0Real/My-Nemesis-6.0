"use client";

import React, { useState, createContext, useContext } from "react";
import Slider from "react-slick";
import { Suspense } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useIcons } from "@/app/utils/CustomIcons";
import { AnimatePresence, motion } from "framer-motion";
import CarouselLoader from "./(loader)/CarouselLoader";

const SwiperContext = createContext({});

export default function SlickCarousel({ children }) {
  const [activeSlide, setActiveSlide] = useState();
  const [oldSlide, setOldSlide] = useState();
  const [nextSlide, setNextSlide] = useState();

  const { RightIcon, LeftIcon } = useIcons();

  const settings = {
    init: true,
    draggable: true,
    // lazyLoad: "anticipated",
    infinite: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    slidesToScroll: 1,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 4,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    beforeChange: (current, next) => {
      setOldSlide(current);
      setNextSlide(next);
    },
    afterChange: (current) => setActiveSlide(current),
  };

  function NextArrow(props) {
    const { onClick, className } = props;
    return (
      <AnimatePresence>
        {!className?.includes("slick-disabled") && (
          <motion.div
            className={`absolute top-0 bottom-0 -right-2 h-fit my-auto grid place-items-center z-10 cursor-pointer`}
            style={{ display: "block" }}
            onClick={onClick}
            whileTap={{ scale: 0.6 }}
            exit={{ opacity: 0 }}
            animate={
              className?.includes("slick-disabled")
                ? { opacity: 0 }
                : { opacity: 1, transition: { duration: 0.5 } }
            }
          >
            {RightIcon}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  function PrevArrow(props) {
    const { onClick, className } = props;
    return (
      <AnimatePresence>
        {!className?.includes("slick-disabled") && (
          <motion.div
            className={`absolute top-0 bottom-0 -left-2 h-fit my-auto grid place-items-center z-10 cursor-pointer`}
            style={{ display: "block" }}
            onClick={onClick}
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
    );
  }

  return (
    <div className="w-full">
      <Suspense fallback={<CarouselLoader />}>
        <Slider {...settings}>{children}</Slider>
      </Suspense>
    </div>
  );
}
