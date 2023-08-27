"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function LocoSap() {
  const root = useRef();
  const text = useRef();
  const section = useRef();

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  });

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: text.current,
        start: "start +=150px",
        end: "end -=150px",
        pin: true,
        scrub: true,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="m-0 w-screen min-h-screen">
      <div className="h-screen w-full bg-green-600 pt-24 flex flex-col justify-between items-center">
        <h1 ref={text} className="text-5xl text-neutral-800 z-10">
          Nemesis
        </h1>
        <section
          ref={section}
          className="self-end w-screen h-[40vh] bg-neutral-400 z-20"
        />
      </div>
      <div className="h-screen bg-neutral-500 w-screen"></div>
    </main>
  );
}
