"use client";

import Lenis from "@studio-freight/lenis";

const SmoothScroller = () => {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  return <></>;
};

export default SmoothScroller;
