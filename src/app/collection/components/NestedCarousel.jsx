"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";

import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function NestedCarousel({ children }) {
  const [activeSlide, setActiveSlide] = useState();

  const settings = {
    init: true,
    draggable: true,
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
      <span
        className={`absolute top-[85px] -right-0 md:-right-10 hover:text-neutral-700 z-10 cursor-pointer ${
          className?.includes("slick-disabled") && "invisible"
        }`}
        style={{ display: "block" }}
        onClick={onClick}
      >
        <ArrowForwardIos />
      </span>
    );
  }

  function PrevArrow(props) {
    const { onClick, className } = props;
    return (
      <span
        className={`absolute top-[85px] -left-0 md:-left-10 hover:text-neutral-700 z-10 cursor-pointer ${
          className?.includes("slick-disabled") && "invisible"
        }`}
        style={{ display: "block" }}
        onClick={onClick}
      >
        <ArrowBackIos />
      </span>
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
