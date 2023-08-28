"use client";

import { useEffect, useRef, useLayoutEffect } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollPin() {
	const gallery = useRef(null);
	const right = useRef(null);
	const left = useRef(null);

	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import("locomotive-scroll")).default;
			const locomotiveScroll = new LocomotiveScroll();
		})();
	});

	useLayoutEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		ScrollTrigger.create({
			trigger: ".gallery",
			start: "top +=40",
			end: "bottom +=240",
			pin: ".right",
		});
		const ctx = gsap.context({});

		return () => ctx.revert();
	}, []);
	return (
		<div className="min-w-screen min-h-screen bg-neutral-100 dark:bg-neutral-800 pt-24">
			<div ref={gallery} className="gallery w-full flex items-start gap-12">
				<div className="left basis-3/5 flex flex-col justify-center items-center gap-2 ">
					<div className="h-screen w-full flex flex-col justify-center items-center gap-3 bg-cyan-600 ">
						<div className="w-12 mx-auto h-12 bg-purple-800"></div>
						<div className="w-12 mx-auto h-12 bg-purple-800"></div>
						<div className="w-12 mx-auto h-12 bg-purple-800"></div>
						<div className="w-12 mx-auto h-12 bg-purple-800"></div>
						<div className="w-12 mx-auto h-12 bg-purple-800"></div>
					</div>
					<div className="h-screen w-full flex flex-col justify-center items-center gap-3 bg-cyan-600 ">
						<div className="w-12 mx-auto h-12 bg-purple-800"></div>
						<div className="w-12 mx-auto h-12 bg-purple-800"></div>
						<div className="w-12 mx-auto h-12 bg-purple-800"></div>
						<div className="w-12 mx-auto h-12 bg-purple-800"></div>
						<div className="w-12 mx-auto h-12 bg-purple-800"></div>
					</div>
					<div className="h-screen w-full flex flex-col justify-center items-center gap-3 bg-cyan-600 ">
						<div className="w-12 mx-auto h-12 bg-purple-800"></div>
						<div className="w-12 mx-auto h-12 bg-purple-800"></div>
						<div className="w-12 mx-auto h-12 bg-purple-800"></div>
						<div className="w-12 mx-auto h-12 bg-purple-800"></div>
						<div className="w-12 mx-auto h-12 bg-purple-800"></div>
					</div>
				</div>
				<div className="basis-2/5 right h-36 pt-24" ref={right}>
					<div className="flex flex-col justify-center items-center">
						<div className="w-24 h-24 rounded-sm bg-orange-500"></div>
					</div>
				</div>
			</div>
			<div className="h-[200vh] w-screen bg-blue-900"></div>
		</div>
	);
}
