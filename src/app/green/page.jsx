"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Green() {
  const [showModal, setShowModal] = useState(false);

  const root = useRef();
  const header = useRef();
  const tl = useRef();
  const modal = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current && tl.current.progress(0).kill();
      tl.current = gsap
        .timeline({
          repeat: -1,
          repeatDelay: 2,
          yoyo: true,
          defaults: { x: 800 },
        })
        .to(
          ".green",
          {
            rotate: 360,
            borderRadius: "50%",
            force3D: true,
            duration: 3,
          },
          0.5
        )
        .to(
          ".yellow",
          {
            rotate: 360,
            borderRadius: "50%",
            force3D: true,
            duration: 2,
          },
          "<0.4"
        )
        .to(
          ".red",
          {
            rotate: 360,
            duration: 1,
            borderRadius: "50%",
            force3D: true,
            duration: 1,
          },
          "<0.6"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  const hoverIn = ({ currentTarget }) => {
    gsap.to(currentTarget, { scale: 1.15 });
  };

  const hoverOut = ({ currentTarget }) => {
    gsap.to(currentTarget, { scale: 1 });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    !showModal
      ? gsap.to(modal.current, { x: 500, ease: "power.inOut", duration: 0.5 })
      : gsap.to(modal.current, { x: 0, ease: "power.inOut", duration: 0.5 });
  };

  return (
    <div
      ref={root}
      className="relative bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 min-h-screen w-screen flex flex-col justify-start items-center pt-24"
    >
      <div
        className="w-full ms-12 bg-neutral-400 rounded-xl"
        onClick={toggleModal}
      >
        <h1 className="text-4xl">Modal</h1>
      </div>
      <div
        ref={modal}
        className="absolute top-36 -left-[30vw] h-[80vh] w-[30vw] bg-neutral-500 border border-neutral-800 dark:border-neutral-200 rounded-lg"
      />
      <h1 ref={header} className="text-3xl">
        Hello Gsap World!
      </h1>
      <div className="mt-16 self-start px-24 w-full flex flex-col justify-center gap-3">
        <div className="green bg-green-500 w-6 h-6"></div>
        <div className="yellow bg-yellow-500 w-6 h-6"></div>
        <div className="red bg-red-500 w-6 h-6"></div>
      </div>
      <div className="mt-4 w-full grid place-content-center">
        <div
          className="w-12 h-10 box text-center"
          onMouseEnter={hoverIn}
          onMouseLeave={hoverOut}
        >
          Hover Me
        </div>
      </div>
    </div>
  );
}
