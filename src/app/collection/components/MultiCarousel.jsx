"use client";

import Link from "next/link";
import { Suspense } from "react";
import Carousel, { consts } from "@itseasy21/react-elastic-carousel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ArrowBackIos } from "@mui/icons-material";

export default function MultiCarousel({ categoryId, parents, children }) {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
    { width: 850, itemsToShow: 3 },
    { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
    { width: 1450, itemsToShow: 5 },
    { width: 1750, itemsToShow: 6 },
  ];

  const arrows = ({ type, onClick, isEdge }) => {
    const pointer =
      type === consts.PREV ? <ArrowBackIos /> : <ArrowForwardIosIcon />;
    return (
      <button
        onClick={onClick}
        disabled={isEdge}
        className="hover:animate-pulse transition-all ease-in-out h-fit m-auto disabled:invisible"
      >
        {pointer}
      </button>
    );
  };

  return (
    <Carousel breakPoints={breakPoints} renderArrow={arrows} pagination={false}>
      {children}
    </Carousel>
  );
}
