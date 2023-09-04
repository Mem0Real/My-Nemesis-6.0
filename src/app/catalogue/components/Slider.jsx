"use client";

import React, { useRef, useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Keyboard } from "swiper/modules";

import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useIcons } from "@/app/utils/CustomIcons";
import InnerSlider from "./InnerSlider";

export default function Slider({
	parents = null,
	childrens = null,
	items = null,
	category = null,
	parent = null,
	child = null,
}) {
	const [hideLeft, setHideLeft] = useState(false);
	const [hideRight, setHideRight] = useState(false);
	const [controlledSwiper, setControlledSwiper] = useState(null);

	const sliderRef = useRef(null);

	const { RightIcon, LeftIcon } = useIcons();

	let content;

	if (items) {
		content = items.map((item) => {
			return (
				item.ChildId === child.id && (
					<SwiperSlide key={item.id}>
						<div
							key={item.id}
							className="flex flex-col items-center justify-between my-12"
						>
							<div className="w-56 h-56 border border-neutral-400 border-b-0 rounded-t-2xl drop-shadow-xl overflow-hidden">
								<div className="relative w-full h-full mx-auto">
									{item.images.length > 0 ? (
										<InnerSlider
											images={item.images}
											id={item.id}
											childId={item.ChildId}
											parentId={item.ParentId}
											categoryId={item.CategoryId}
										/>
									) : child.image ? (
										<Image
											src={child.image}
											alt={parent.id}
											fill={true}
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											className="absolute object-contain"
											priority={true}
										/>
									) : parent.image ? (
										<Image
											src={parent.image}
											alt={parent.id}
											fill={true}
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											className="absolute object-contain"
											priority={true}
										/>
									) : (
										<div className="w-full h-full mx-auto flex flex-col items-center justify-center text-neutral-700 dark:text-neutral-300">
											<h1 className="text-xs italic">No Image</h1>
										</div>
									)}
								</div>
							</div>
							<div className="w-56 border border-neutral-400 rounded-b-2xl text-center text-sm py-5 hover:underline underline-offset-2">
								<Link
									key={item.id}
									href={`/catalogue/${item.CategoryId}/${item.ParentId}/${item.ChildId}/${item.id}`}
								>
									<h1>{item.name}</h1>
								</Link>
							</div>
						</div>
					</SwiperSlide>
				)
			);
		});
	} else if (childrens) {
		content = childrens.map((child) => {
			return (
				child.ParentId === parent.id && (
					<SwiperSlide key={child.id}>
						<div
							key={child.id}
							className="flex flex-col items-center justify-between my-12"
						>
							<div className="w-56 h-56 border border-neutral-400 border-b-0 rounded-t-2xl drop-shadow-xl overflow-hidden">
								<div className="relative w-full h-full mx-auto">
									{child.image ? (
										<Image
											src={child.image}
											alt={child.id}
											fill={true}
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											className="absolute object-contain"
											priority={true}
										/>
									) : parent.image ? (
										<Image
											src={parent.image}
											alt={child.id}
											fill={true}
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											className="absolute object-contain"
											priority={true}
										/>
									) : category.image ? (
										<Image
											src={category.image}
											alt={child.id}
											fill={true}
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											className="absolute object-contain"
											priority={true}
										/>
									) : (
										<div className="w-full h-full mx-auto flex flex-col items-center justify-center text-neutral-700 dark:text-neutral-300">
											<h1 className="text-xs italic">No Image</h1>
										</div>
									)}
								</div>
							</div>
							<div className="w-56 border border-neutral-400 rounded-b-2xl text-center text-sm py-5 hover:underline underline-offset-2 ">
								<Link
									key={child.id}
									href={`/catalogue/${child.CategoryId}/${child.ParentId}/${child.id}`}
								>
									<h1>{child.name}</h1>
								</Link>
							</div>
						</div>
					</SwiperSlide>
				)
			);
		});
	} else if (parents) {
		content = parents.map((parent) => {
			return (
				parent.CategoryId === category.id && (
					<SwiperSlide key={parent.id}>
						<div
							key={parent.id}
							className="flex flex-col items-center justify-between my-12"
						>
							<div className="w-56 h-56 border border-neutral-400 border-b-0 rounded-t-2xl drop-shadow-xl overflow-hidden">
								<div className="relative w-full h-full mx-auto">
									{parent.image ? (
										<Image
											src={parent.image}
											alt={parent.id}
											fill={true}
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											className="absolute object-contain"
											priority={true}
										/>
									) : category.image ? (
										<Image
											src={category.image}
											alt={parent.id}
											fill={true}
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											className="absolute object-contain"
											priority={true}
										/>
									) : (
										<div className="w-full h-full mx-auto flex flex-col items-center justify-center text-neutral-700 dark:text-neutral-300">
											<h1 className="text-xs italic">No Image</h1>
										</div>
									)}
								</div>
							</div>
							<div className="w-56 border border-neutral-400 rounded-b-2xl text-center text-sm py-5 hover:underline underline-offset-2">
								<Link
									key={parent.id}
									href={`/catalogue/${parent.CategoryId}/${parent.id}`}
								>
									<h1>{parent.name}</h1>
								</Link>
							</div>
						</div>
					</SwiperSlide>
				)
			);
		});
	}

	const handlePrev = useCallback(() => {
		if (!sliderRef.current) return;
		sliderRef.current.swiper.slidePrev();
	}, []);

	const handleNext = useCallback(() => {
		if (!sliderRef.current) return;
		sliderRef.current.swiper.slideNext();
	}, []);

	return (
		<div className="overflow-hidden w-full mx-auto relative">
			<div className="w-[95%] mx-auto">
				<Swiper
					ref={sliderRef}
					modules={[Navigation, Pagination, A11y, Keyboard]}
					spaceBetween={50}
					slidesPerView={3}
					pagination={{ dynamicBullets: true, clickable: true }}
					grabCursor={true}
					keyboard={{
						enabled: true,
					}}
					rewind={true}
					centerInsufficientSlides={true}
					watchOverflow={true}
					breakpoints={{
						1366: {
							slidesPerView: 4,
						},
						1024: {
							slidesPerView: 3,
						},
						768: {
							slidesPerView: 2,
						},
						500: {
							slidesPerView: 1,
						},
						320: {
							slidesPerView: 1,
						},
					}}
					onActiveIndexChange={(e) => {
						if (e.isBeginning) {
							setHideLeft(true);
						} else if (e.isEnd) {
							setHideRight(true);
						} else {
							setHideLeft(false);
							setHideRight(false);
						}
					}}
					onSwiper={setControlledSwiper}
				>
					{content}
				</Swiper>
			</div>
			<motion.div
				className={`arrowLeft absolute top-0 bottom-0 -left-1 h-fit my-auto grid place-items-center z-10 cursor-pointer px-3 py-2`}
				style={{ display: "block" }}
				whileTap={{ scale: 0.95 }}
				initial={{ opacity: 0 }}
				whileHover={{ scale: 1.5 }}
				onClick={handlePrev}
				animate={
					controlledSwiper?.isBeginning && controlledSwiper?.isEnd
						? { opacity: 0 }
						: { opacity: 1 }
				}
			>
				{LeftIcon}
			</motion.div>
			<motion.div
				className={`arrowRight absolute top-0 bottom-0 -right-1 h-fit my-auto grid place-items-center z-10 cursor-pointer px-3 py-2`}
				style={{ display: "block" }}
				initial={{ opacity: 0 }}
				whileTap={{ scale: 0.95 }}
				whileHover={{ scale: 1.5 }}
				onClick={handleNext}
				animate={
					controlledSwiper?.isBeginning && controlledSwiper?.isEnd
						? { opacity: 0 }
						: { opacity: 1 }
				}
			>
				{RightIcon}
			</motion.div>
		</div>
	);
}
