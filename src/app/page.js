"use client";
import { useEffect } from "react";

import Header from "./components/Header";
import Lenis from "@studio-freight/lenis";

export default async function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="relative ">
      <Header />
    </div>
  );
}
