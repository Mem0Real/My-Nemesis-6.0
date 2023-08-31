"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

const SmoothScroller = () => {
	useEffect(() => {
		const lenis = new Lenis({
			smoothTouch: true,
			touchMultiplier: 1.15,
			touchInertiaMultiplier: 8,
			syncTouch: true,
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
