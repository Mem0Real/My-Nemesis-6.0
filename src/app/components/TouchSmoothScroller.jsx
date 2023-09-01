"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

const TouchSmoothScroller = () => {
	useEffect(() => {
		const lenis = new Lenis({
			smooth: true,
			smoothTouch: true,
			touchMultiplier: 1.15,
			touchInertiaMultiplier: 8,
			syncTouch: true,
			smoothWheel: true,
		});

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		console.log("SmoothIndeed");
		requestAnimationFrame(raf);
	}, []);

	return <></>;
};

export default TouchSmoothScroller;
