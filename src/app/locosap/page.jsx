"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";

import { useThemeContext } from "@/context/ThemeProvider";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LocoSap() {
  const { update } = useThemeContext();

  const [currentTheme, setCurrentTheme] = useState("");

  useEffect(() => {
    const theme = localStorage.getItem("isDarkTheme");
    if (theme === "false") setCurrentTheme("light");
    else setCurrentTheme("dark");
  }, [update]);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  });

  const root = useRef();
  const text = useRef();
  const section = useRef();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ScrollTrigger.create({
      //   trigger: text.current,
      //   start: "start +=300px",
      //   end: "bottom",
      //   pin: true,
      //   scrub: true,
      // });

      gsap.set(text.current, {
        y: -50,
        scale: 0.7,
      });
      gsap.to(text.current, {
        scale: 1,
        y: 500,
        scrollTrigger: {
          trigger: text.current,
          start: "top +=250",
          end: "+=800px",
          // pin: true,
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="m-0 w-screen min-h-screen">
      <div className="relative grid place-items-center w-screen h-screen">
        {currentTheme === "light" ? (
          <Image
            src="/images/Day.png"
            fill
            sizes="(max-width: 768px) 100vw"
            alt="catalogue"
            className="object-cover object-center"
          />
        ) : (
          <Image
            src="/images/Night.png"
            fill
            sizes="(max-width: 768px) 100vw"
            alt="catalogue"
            className="object-cover object-center"
          />
        )}
        <h1
          ref={text}
          className="z-10 text-6xl text-neutral-800 dark:text-neutral-200"
        >
          Ethio Machineries
        </h1>
        <div ref={section} className="absolute inset-0 z-10">
          <Image
            fill
            alt="dark"
            className="object-cover object-bottom"
            src="/images/Building.png"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
            quality={100}
            priority
          />
        </div>
      </div>
      <div className="h-screen bg-neutral-900 w-screen z-30"></div>
    </main>
  );
}
