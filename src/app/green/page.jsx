"use client";

import { useLayoutEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Green() {
  const main = useRef();
  const text = useRef();
  const mask = useRef();
  const container = useRef();

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

      gsap.to(text.current, {
        y: "15em",
        scrollTrigger: {
          trigger: text.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          // markers: true,
        },
      });

      gsap.to(mask.current, {
        x: "-5em",
        scrollTrigger: {
          trigger: mask.current,
          start: "top top",
          end: "+=50vh 100",
          scrub: true,
          markers: true,
          pin: true,
        },
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
    <div className="flex flex-col justify-center items-center pt-44 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
      <section className={` flex flex-col justify-center items-center`}>
        <h1>Basic ScrollTrigger with React</h1>
        <h2>Scroll down to see the magic happen!!</h2>
      </section>
      <div ref={text} className="px-8 py-4 bg-purple-500 rounded">
        Nemesis
      </div>

      <div
        className={` flex flex-col justify-center items-center gap-24 `}
        ref={main}
      >
        <div className="box px-8 py-4 bg-green-500 rounded ">box</div>
        <div className="box px-8 py-4 bg-green-500 rounded ">box</div>
        <div className="box px-8 py-4 bg-green-500 rounded ">box</div>
      </div>
      <section ref={container} className="h-[300vh]">
        <div
          ref={mask}
          className="px-24 py-36 absolute bg-transparent border-2 border-neutral-900 dark:border-neutral-200 rounded-full"
        />
      </section>
      <section className="h-[300vh]"></section>
    </div>
  );
}
