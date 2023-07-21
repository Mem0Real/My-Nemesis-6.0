"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";

import { useIcons } from "@/app/utils/CustomIcons";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function NestedCarousel({ children }) {
  const [activeSlide, setActiveSlide] = useState();

  const { RightArrow, LeftArrow } = useIcons();

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
        className="absolute top-0 bottom-0 grid place-content-center mt-0.5 -right-3 h-full bg-gradient-to-l from-neutral-700 to-neutral-500/10 cursor-pointer rounded-tr-3xl z-10"
        onClick={onClick}
      >
        <span
          className={`${className?.includes("slick-disabled") && "invisible"}`}
          style={{ display: "block" }}
        >
          {RightArrow}
        </span>
      </div>
    );
  }

  function PrevArrow(props) {
    const { onClick, className } = props;
    return (
      <div
        className="absolute top-0 bottom-0 grid place-content-center mt-0.5 -left-3 h-full bg-gradient-to-r from-neutral-700 to-neutral-500/10 cursor-pointer rounded-tl-3xl z-10"
        onClick={onClick}
      >
        <span
          className={`${className?.includes("slick-disabled") && "invisible"}`}
          style={{ display: "block" }}
        >
          {LeftArrow}
        </span>
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
