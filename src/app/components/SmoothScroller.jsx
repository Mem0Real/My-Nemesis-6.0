"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

const SmoothScroller = () => {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      smoothTouch: true,
      touchMultiplier: 1.5,
      touchInertiaMultiplier: 10,
      syncTouch: true,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return <></>;
};

export default SmoothScroller;
