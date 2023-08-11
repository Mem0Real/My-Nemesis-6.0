"use client";
import { useEffect } from "react";

import Lenis from "@studio-freight/lenis";

export default function BestSellers({ products }) {
  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="w-[90%] min-h-screen flex flex-col mx-auto items-center justify-start py-6 md:py-12 gap-6 bg-neutral-100 dark:bg-neutral-900">
      <h1 className="text-3xl font-semibold text-neutral-800 dark:text-neutral-200 my-5 pb-5">
        Best Sellers
      </h1>
      <div className="w-[80%] mx-auto flex items-center border border-neutral-300/30 dark:border-neutral-900/50 h-full">
        <div className="flex flex-col items-center h-full">
          {/* {products} */}
          <h1>Image</h1>
          <h1>Name</h1>
          <h1>Price</h1>
        </div>
      </div>
    </div>
  );
}
