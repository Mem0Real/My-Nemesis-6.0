"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

const SmoothScroller = () => {
	useEffect(() => {
		const width = window.innerWidth;

		const isMobile = width < 768;

		const touchMultiplier = isMobile ? 1.0 : undefined;
		const touchInertiaMultiplier = isMobile ? 10 : undefined;

		const lenis = new Lenis({
			smooth: true,
			// smoothTouch: true,
			// touchMultiplier: isMobile ? 1.0 : 1.35,
			// touchInertiaMultiplier: isMobile ? 10 : 13,
			touchMultiplier,
			touchInertiaMultiplier,
			// syncTouch: true,
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
