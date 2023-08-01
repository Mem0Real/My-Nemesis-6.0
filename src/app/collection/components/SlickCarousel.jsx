"use client";

import React, { useState, createContext, useContext } from "react";
import Slider from "react-slick";
import { Suspense } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useIcons } from "@/app/utils/CustomIcons";

const SwiperContext = createContext({});

export default function SlickCarousel({ children }) {
  const [activeSlide, setActiveSlide] = useState();
  const { RightIcon, LeftIcon } = useIcons();
  const [parentSwipe, setParentSwipe] = useState(true);

  const settings = {
    init: true,
    draggable: true,
    lazyLoad: "anticipated",
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
    afterChange: (current) => setActiveSlide(current),
  };

  function NextArrow(props) {
    const { onClick, className } = props;
    return (
      <span
        className={`absolute top-0 bottom-0 right-0 h-fit my-auto grid place-items-center z-10 cursor-pointer ${
          className?.includes("slick-disabled") && "invisible"
        }`}
        style={{ display: "block" }}
        onClick={onClick}
      >
        {RightIcon}
      </span>
    );
  }

  function PrevArrow(props) {
    const { onClick, className } = props;
    return (
      <span
        className={`absolute top-0 bottom-0 h-fit my-auto grid place-items-center z-10 cursor-pointer ${
          className?.includes("slick-disabled") && "invisible"
        }`}
        style={{ display: "block" }}
        onClick={onClick}
      >
        {LeftIcon}
      </span>
    );
  }

  return (
    <div className="w-full">
      <Suspense fallback={<h1>Loading...</h1>}>
        <Slider {...settings}>{children}</Slider>
      </Suspense>
    </div>
  );
}
