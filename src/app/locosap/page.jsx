"use client";

import { useEffect } from "react";

export default function LocoSap() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  });

  return (
    <main className="w-screen min-h-screen pt-24 bg-neutral-100 dark:bg-neutral-800">
      <div className="flex flex-col justify-between items-center gap-24 w-full">
        <div className="w-24 h-16 bg-green-500"></div>
        <div className="w-24 h-16 bg-green-500"></div>
        <div className="w-24 h-16 bg-green-500"></div>
        <div className="w-24 h-16 bg-green-500"></div>
        <div className="w-24 h-16 bg-green-500"></div>
      </div>
    </main>
  );
}
