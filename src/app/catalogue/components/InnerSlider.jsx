"use client";

import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";

import { motion } from "framer-motion";
import React from "react";

export default function InnerSlider({
	images,
	id,
	childId,
	parentId,
	categoryId,
}) {
	return (
		<div className="w-full h-full">
			<Swiper
				modules={[A11y, Autoplay]}
				slidesPerView={1}
				rewind={true}
				centeredSlides={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				className="h-full w-full"
			>
				{images.map((img, index) => {
					return (
						<SwiperSlide key={img}>
							<Link
								href={`/catalogue/${categoryId}/${parentId}/${childId}/${id}`}
								className="w-full h-full absolute"
							>
								<Image
									src={img}
									alt={index}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									className="object-contain object-center"
									priority={true}
								/>
							</Link>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
}
