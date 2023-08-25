"use client";

import { useLayoutEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Green() {
  const main = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const boxes = self.selector(".box");
      boxes.forEach((box) => {
        gsap.to(box, {
          x: 150,
          scrollTrigger: {
            trigger: box,
            start: "bottom bottom",
            end: "top 20%",
            scrub: true,
          },
        });
      });
    }, main);
    return () => ctx.revert();
  }, []);

  // gsap.to(".hello", {
  //   yPercent: 50,
  //   scrollTrigger: {
  //     trigger: ".hello",
  //     start: "top center",
  //     end: "bottom top",
  //     scrub: true,
  //     markers: true,
  //   },
  // });

  // gsap.to(".c", {
  //   scrollTrigger: {
  //     trigger: ".c",
  //     toggleActions: "restart none none none",
  //   },
  //   rotation: 360,
  //   duration: 3,
  //   scale: 2,
  //   transformOrigin: "50% 50%",
  //   ease: "out",
  // });

  return (
    <div className="flex flex-col justify-center items-center mt-24">
      <section className={` flex flex-col justify-center items-center`}>
        <h1>Basic ScrollTrigger with React</h1>
        <h2>Scroll down to see the magic happen!!</h2>
      </section>
      <div
        className={` flex flex-col justify-center items-center gap-24 mt-[70vh]`}
        ref={main}
      >
        <div className="box px-8 py-4 bg-green-500 rounded ">box</div>
        <div className="box px-8 py-4 bg-green-500 rounded ">box</div>
        <div className="box px-8 py-4 bg-green-500 rounded ">box</div>
      </div>
      <section className="section"></section>
    </div>
  );
}
