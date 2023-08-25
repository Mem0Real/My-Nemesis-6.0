"use client";

import { gsap } from "gsap";
import { useEffect } from "react";

export default function Green() {
  useEffect(() => {
    gsap.to(".hello", {
      duration: 2,
      x: 300,
      backgroundColor: "green",
      borderRadius: "20%",
      border: "5px solid white",
      ease: "elastic",
    });
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 w-screen flex flex-col justify-center items-center">
      <h1 className="hello text-4xl">Hello</h1>
    </div>
  );
}
