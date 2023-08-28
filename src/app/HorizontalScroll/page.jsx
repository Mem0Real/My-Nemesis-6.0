"use client";

import { useRef, useLayoutEffect } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HorizontalScroll() {
	const root = useRef();

	useLayoutEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const races = document.querySelector(".races");

		function getScrollAmount() {
			let racesWidth = races.scrollWidth;
			return -(racesWidth - window.innerWidth);
		}

		const tween = gsap.to(races, {
			x: getScrollAmount,
			duration: 3,
			ease: "none",
		});

		ScrollTrigger.create({
			trigger: ".raceWrapper",
			start: "top 20%",
			end: () => `+=${getScrollAmount() * -1}`,
			pin: true,
			animation: tween,
			scrub: 1,
			invalidateOnRefresh: true,
		});
	}, []);

	return (
		<div className="bg-slate-400 dark:bg-slate-800">
			<div className="bg-neutral-400 h-[50vh]" />
			<div className="raceWrapper overflow-hidden">
				<div className="races w-fit flex flex-nowrap">
					<h2 className="text-[10vw] shrink-0 pr-[0.3em] pl-[0.3em] text-neutral-800 dark:text-neutral-200 m-0">
						Making
					</h2>
					<h2 className="text-[10vw] shrink-0 pr-[0.3em] pl-[0.3em] text-neutral-800 dark:text-neutral-200 m-0">
						The World
					</h2>
					<h2 className="text-[10vw] shrink-0 pr-[0.3em] pl-[0.3em] text-neutral-800 dark:text-neutral-200 m-0 italic bg-neutral-100 dark:bg-neutral-800">
						A Better
					</h2>
					<h2 className="text-[10vw] shrink-0 pr-[0.3em] pl-[0.3em] text-neutral-800 dark:text-neutral-200 m-0 italic bg-neutral-100 dark:bg-neutral-800">
						Place
					</h2>
				</div>
			</div>
			<div className="bg-neutral-400 h-[100vh]" />
		</div>
	);
}
