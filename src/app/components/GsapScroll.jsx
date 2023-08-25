"use client";

import React, { useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import { useIsomorphicLayoutEffect } from "@/helpers/isomorphicEffect";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function GsapScroll({ children }) {
  const main = useRef();
  const smoother = useRef();

  const scrollTo = () => {
    smoother.current.scrollTo(".topSection", true, "center center");
  };

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      smoother.current = ScrollSmoother.create({
        smooth: 2,
        effects: true,
      });

      ScrollTrigger.create({
        trigger: ".topSection",
        pin: true,
        start: "center center",
        end: "+=300",
        markers: true,
      });
    }, main);

    return () => ctx.revert();
  }, []);

  return (
    <div id="smooth-wrapper" ref={main}>
      <div id="smooth-content">
        {children}
        <button className="button" onClick={scrollTo}>
          Top
        </button>
      </div>
    </div>
  );
}
