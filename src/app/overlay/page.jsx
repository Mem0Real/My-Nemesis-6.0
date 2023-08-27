"use client";

import { useLayoutEffect, useRef } from "react";

import { gsap } from "gsap";
import Link from "next/link";

export default function Overlay() {
  const root = useRef();
  const button = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {}, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="w-screen min-h-screen overflow-hidden bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:to-neutral-100 pt-24"
    >
      <div
        ref={button}
        className="button absolute top-8 right-5 w-28 h-28 flex justify-center items-center m-[2em] ml-1 z-20 cursor-pointer"
      >
        <div
          className="btnOutline btnOutline1 absolute w-24 h-20 border border-neutral-800 dark:border-neutral-200"
          style={{
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            animation: "morph 4s linear infinite",
          }}
        ></div>
        <div
          className="btnOutline btnOutline2 absolute w-24 h-20 border border-neutral-800 dark:border-neutral-200 "
          style={{ borderRadius: "53% 47% 43% 57% / 51% 39% 61% 49%" }}
        ></div>
        <div className="hamburger relative w-5 h-5 z-20">
          <div
            className="absolute right-0 inline-block content-none w-4 h-[1.25px] bg-neutral-100 dark:bg-neutral-800 transition-transform duration-300"
            style={{ transform: "translateY(-4px)" }}
          ></div>
          <span className="absolute top-1/2 inline-block w-6 h-[1.25px] bg-neutral-100 dark:bg-neutral-800 transition-transform duration-300 transform -translate-y-1/2 active:rotate-45 "></span>
        </div>
      </div>

      <div className="overlay absolute w-screen h-screen top-0 left-0 z-0">
        <svg viewBox="0 0 1000 1000">
          <path
            d="M0 2S175 1 500 1s500 1 500 1V0H0Z"
            className="fill-neutral-950 dark:fill-neutral-50 "
          ></path>
        </svg>
      </div>
      <div className="menu">
        <div className="primaryMenu">
          <div className="menuWrapper">
            <div className="wrapper">
              <div className="menuItem">
                <Link href="#">
                  <span>I</span>Home
                </Link>
                <div className="menuItemRevealer"></div>
              </div>
              <div className="menuItem">
                <Link href="#">
                  <span>II</span>Services
                </Link>
                <div className="menuItemRevealer"></div>
              </div>
              <div className="menuItem">
                <Link href="#">
                  <span>III</span>About
                </Link>
                <div className="menuItemRevealer"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="secondaryMenu">
          <div className="menuContainer">
            <div className="wrapper">
              <div className="menuItem">
                <Link href="#">Speaker</Link>
                <div className="menuItemRevealer"></div>
              </div>
              <div className="menuItem">
                <Link href="#">Blog</Link>
                <div className="menuItemRevealer"></div>
              </div>
              <div className="menuItem">
                <Link href="#">Contact</Link>
                <div className="menuItemRevealer"></div>
              </div>
            </div>
            <div className="wrapper">
              <div className="menuItem">
                <Link href="#">Credits</Link>
                <div className="menuItemRevealer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
