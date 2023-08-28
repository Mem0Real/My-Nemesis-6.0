"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";

import { useThemeContext } from "@/context/ThemeProvider";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LocoSap() {
	const { update } = useThemeContext();

	const [currentTheme, setCurrentTheme] = useState("");

	useEffect(() => {
		const theme = localStorage.getItem("isDarkTheme");
		if (theme === "false") setCurrentTheme("light");
		else setCurrentTheme("dark");
	}, [update]);

	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import("locomotive-scroll")).default;
			const locomotiveScroll = new LocomotiveScroll();
		})();
	});

	const root = useRef();
	const text = useRef();
	const section = useRef();

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

		const ctx = gsap.context(() => {
			ScrollTrigger.create({
				trigger: ".hero",
				start: "top +=40px",
				end: "center start",
				pin: ".text",
				scrub: 1,
				markers: true,
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
		}, root);

		return () => ctx.revert();
	}, []);
	const bgImage =
		currentTheme === "light" ? (
			<Image
				src="/images/Day.png"
				fill
				sizes="(max-width: 768px) 100vw"
				alt="catalogue"
				className="object-cover object-center"
			/>
		) : (
			<Image
				src="/images/Night.png"
				fill
				sizes="(max-width: 768px) 100vw"
				alt="catalogue"
				className="object-cover object-center"
			/>
		);
	return (
		<main ref={root} className="m-0 w-screen min-h-screen">
			<div className="relative grid place-items-center w-screen h-screen pt-24">
				{bgImage}
				<div className="hero h-[100vh] w-screen flex flex-col items-center z-10">
					<h1 className="text h-36 pt-24 text-6xl text-neutral-800 dark:text-neutral-200">
						Ethio Machineries
					</h1>
				</div>
				<div ref={section} className="absolute inset-0 z-10">
					<Image
						fill
						alt="dark"
						className="object-cover object-bottom"
						src="/images/Building.png"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
						quality={100}
						priority
					/>
				</div>
			</div>
			<div className="bg-slate-400 dark:bg-slate-800">
				{/* <div className="bg-neutral-400 h-[50vh]" /> */}
				<div className="raceWrapper overflow-hidden py-[25vh]">
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
		</main>
	);
}
