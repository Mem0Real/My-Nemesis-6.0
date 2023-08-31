"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

const TouchSmoothScroller = () => {
	useEffect(() => {
		const lenis = new Lenis({
			// smooth: true,
			smoothTouch: true,
			// touchMultiplier: isMobile ? 1.0 : 1.35,
			// touchInertiaMultiplier: isMobile ? 10 : 13,
			touchMultiplier: 1.15,
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

export default TouchSmoothScroller;
