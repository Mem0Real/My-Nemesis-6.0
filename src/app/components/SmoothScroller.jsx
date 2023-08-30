"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

const SmoothScroller = () => {
	useEffect(() => {
		// const touchMultiplier =  1.0
		// const touchInertiaMultiplier =  10

		const lenis = new Lenis({
			// smooth: true,
			smoothTouch: true,
			// touchMultiplier: isMobile ? 1.0 : 1.35,
			// touchInertiaMultiplier: isMobile ? 10 : 13,
			touchMultiplier: 1.2,
			touchInertiaMultiplier: 8,
			syncTouch: true,
			// smoothWheel: true,
		});

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	}, []);

	return <></>;
};

export default SmoothScroller;
