"use client";

import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

function NextArrow(props) {
  const { onClick, data } = props;
  return (
    data && (
      <span
        className="absolute top-[100px] md:top-28 -right-0 md:-right-5 hover:text-neutral-700 z-10 cursor-pointer"
        style={{ display: "block" }}
        onClick={onClick}
      >
        <ArrowForwardIos />
      </span>
    )
  );
}

function PrevArrow(props) {
  const { onClick, data } = props;
  return (
    data && (
      <span
        className="absolute top-[100px] md:top-28 -left-0 md:-left-5 hover:text-neutral-700 z-10 cursor-pointer"
        style={{ display: "block" }}
        onClick={onClick}
      >
        <ArrowBackIos />
      </span>
    )
  );
}

export default function SlickCarousel({ categoryId, parents }) {
  const settings = {
    draggable: true,
    nextArrow: <NextArrow data={parents} />,
    prevArrow: <PrevArrow data={parents} />,
    slidesToScroll: 1,
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
  };
  return (
    <div className="w-[90%] mx-auto">
      <Slider {...settings}>
        {parents.map((parent) => {
          return (
            <div key={parent.id} className="flex gap-4">
              <Link
                href={`/collection/${categoryId}/${parent.id}`}
                className="flex w-56 mx-auto flex-col items-center group md:my-5 bg-transparent "
              >
                <div className="relative w-full h-44 border border-black rounded-t-3xl shadow-inner shadow-neutral-950 hover:shadow-neutral-700 transition-all ease-in-out">
                  {parent.image && (
                    <Suspense
                      fallback={
                        <h1 className="text-sm text-black">Loading Image</h1>
                      }
                    >
                      <Image
                        src={parent.image}
                        srcSet={parent.id}
                        alt={parent.id}
                        fill={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="absolute object-contain"
                        priority={true}
                        blurDataURL="URL"
                        placeholder="blur"
                      />
                    </Suspense>
                  )}
                </div>
                <div className="w-full h-12 flex flex-col items-start ps-4 pt-3 rounded-b-2xl bg-neutral-800 text-neutral-200 shadow-xl shadow-neutral-950 transition-all ease-in-out duration-1000 group-hover:shadow-neutral-700 ">
                  <h1>{parent.name}</h1>
                </div>
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
