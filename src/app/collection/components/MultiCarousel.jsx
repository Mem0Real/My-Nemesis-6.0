"use client";

import Link from "next/link";
import Carousel, { consts } from "@itseasy21/react-elastic-carousel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ArrowBackIos } from "@mui/icons-material";

export default function MultiCarousel({ category, parents }) {
  const style = {};
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

  const pagination = ({ pages, activePage, onClick }) => {
    return (
      <div className="flex gap-4 my-3">
        {pages.map((page) => {
          const isActivePage = activePage === page;
          return (
            <div
              className="p-1 rounded-full ring-2 ring-neutral-800 flex items-center cursor-pointer"
              onClick={() => onClick(page)}
              active={isActivePage}
            >
              <h1 className="text-4xl">Hi</h1>
              <div
                className={`p-0.5 rounded-full bg-neutral-200 transition-all ease-in-out duration-700 ${
                  isActivePage && "bg-neutral-900"
                }`}
              ></div>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <Carousel
      breakPoints={breakPoints}
      renderArrow={arrows}
      renderPagination={pagination}
      pagination={false}
    >
      {parents.map((parent) => {
        return (
          <Link
            key={parent.id}
            href={`/collection/${category.id}/${parent.id}`}
          >
            <div className="flex flex-col items-center group md:my-5">
              {parent.image && (
                <div
                  className="w-56 h-44 border border-black rounded-t-3xl shadow-inner shadow-neutral-950 hover:shadow-neutral-700 transition-all ease-in-out "
                  style={{
                    backgroundImage: `url(${parent.image})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                ></div>
              )}
              <div className="h-12 flex flex-col items-start ps-4 pt-3 rounded-b-2xl w-full bg-neutral-800 text-neutral-200 shadow-xl shadow-neutral-950 transition-all ease-in-out duration-500 group-hover:shadow-neutral-700 ">
                <h1>{parent.name}</h1>
              </div>
            </div>
          </Link>
        );
      })}
    </Carousel>
  );
}
