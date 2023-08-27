"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroller = () => {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      smoothTouch: true,
      touchMultiplier: 1.35,
      touchInertiaMultiplier: 13,
      syncTouch: true,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(raf);
  }, []);

  return <></>;
};

export default SmoothScroller;
