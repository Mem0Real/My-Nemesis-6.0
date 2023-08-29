"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Company from "../(landing)/components/Company";

export default function Scale() {
	const root = useRef();
	const container = useRef();
	const mask = useRef();

	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import("locomotive-scroll")).default;
			const locomotiveScroll = new LocomotiveScroll();
		})();
	});

	useLayoutEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		const width = window.innerWidth;
		const isMobile = width < 768;

		function getMoveAmount() {
			let containerWidth = gsap.getProperty(container.current, "width");
			let maskWidth = gsap.getProperty(mask.current, "width");

			return -(containerWidth / 2 - maskWidth / 2);
		}

		function transformOrigin() {
			const rect = mask.current.getBoundingClientRect();

			const maskWidth = gsap.getProperty(mask.current, "width");
			const maskHeight = gsap.getProperty(mask.current, "height");

			const RectWCenter = rect.left + rect.width / 2;
			const MaskWCenter = maskWidth / 2;

			const RectHCenter = rect.top + rect.height / 2;
			const MaskHCenter = isMobile ? maskHeight * 2 : maskHeight / 2;

			const centerW = RectWCenter - MaskWCenter;
			const centerH = RectHCenter - MaskHCenter;

			const transformOrigin = `${centerW}px ${centerH}px`;

			return transformOrigin;
		}

		gsap.set(container.current, {
			scale: 1,
		});
		gsap.set(mask.current, {
			scale: 1,
		});

		const timeline = gsap.timeline();
		timeline.to(container.current, {
			scale: 3,
			ease: "sine",
			smoothOrigin: true,
			transformOrigin,
		});
		if (isMobile) {
			timeline.to(
				mask.current,
				{
					scale: 4,
					y: -250,
					ease: "sine",
					smoothOrigin: true,
					// transformOrigin,
				},
				"<"
			);
		} else {
			timeline.to(
				mask.current,
				{
					scale: 4,
					x: -250,
					ease: "sine",
					smoothOrigin: true,
				},
				"<"
			);
		}
		timeline.to(
			mask.current,
			{
				border: 0,
				ease: "sine",
			},
			"<"
		);

		const ctx = gsap.context(() => {
			ScrollTrigger.create({
				trigger: container.current,
				start: "+=100 +=50",
				end: "bottom top",
				pin: true,
				scrub: 2,
				markers: true,
				animation: timeline,
				invalidateOnRefresh: true,
			});
		}, root);

		return () => ctx.revert();
	}, []);

	return (
		<div
			ref={root}
			className="min-w-screen min-h-screen bg-neutral-100 dark:bg-neutral-800 pt-24"
		>
			<div
				ref={container}
				className="flex flex-col justify-center items-center w-[90%] py-12 mx-auto rounded-3xl bg-neutral-50 dark:bg-neutral-900"
			>
				<div className="flex flex-col md:flex-row w-full items-center justify-between gap-5 px-5">
					<div className="left flex-1 flex flex-col justify-center items-center gap-9">
						<h1 className="mb-5 max-w-[12ch] font-bold leading-[0.85] md:my-auto text-4xl md:text-6xl xl:text-7xl">
							Browse to your heart&apos;s desire!
						</h1>
						<p className="text-lg md:text-2xl px-6">
							From the wide variety of products our company offers, we can
							guarantee that you will find what you are looking for.
						</p>
					</div>
					<div className="mask flex-1 flex flex-col justify-center items-center">
						<div
							ref={mask}
							className="mx-auto mb-7 mt-4 box-content aspect-[5/8] w-[100px] min-w-[100px] rounded-full border border-gray-800 dark:border-gray-300 md:my-auto md:-mr-1 md:ml-auto md:w-[150px] md:min-w-[150px] bg-neutral-100 dark:bg-neutral-900"
						/>
					</div>
				</div>
			</div>
			<Company />
			<div className="h-[200vh] bg-neutral-100 dark:bg-neutral-950"></div>
		</div>
	);
}
