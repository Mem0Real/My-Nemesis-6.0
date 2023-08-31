"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

export default function TESmoothScroller() {
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

		requestAnimationFrame(raf);
	}, []);

	return <></>;
}
