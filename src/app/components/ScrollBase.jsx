"use client";

import { useScrollContext } from "@/context/ScrollBlock";
import SmoothScroller from "./SmoothScroller";
import { useEffect } from "react";

export default function ScrollBase() {
  const { block } = useScrollContext();

  //   useEffect(() => {
  //     if (block) {
  //       const el = document.getElementById("hyper");
  //       el?.classList.remove("lenis lenis-smooth lenis-scrolling");
  //     }
  //   }, [block]);

  console.log("Block: ", block);
  return !block && <SmoothScroller />;
}
