"use client";

import Image from "next/image";
import React, { useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const images = [
	"/images/1.png",
	"/images/2.png",
	"/images/3.png",
	"/images/4.png",
	"/images/5.png",
	"/images/6.png",
	"/images/7.png",
];
export default function Slider() {
	// useEffect(() => {
	// 	const swiper = new Swiper(".swiperContainer", {});
	// }, []);

	// return (
	// 	<div className="swiperContainer">
	// 		<div className="swiperWrapper">
	// 			{images.map((img, index) => {
	// 				return (
	// 					<div key={index} className="relative w-56 h-56 rounded-lg">
	// 						<Image
	// 							src={img}
	// 							alt=""
	// 							fill
	// 							className="object-contain object-center"
	// 						/>
	// 					</div>
	// 				);
	// 			})}
	// 		</div>
	// 	</div>
	// );

	return (
		<div className="overflow-hidden w-full">
			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				spaceBetween={50}
				slidesPerView={3}
				navigation
				pagination={{ clickable: true }}
				scrollbar={{ draggable: true }}
				onSwiper={(swiper) => console.log(swiper)}
				onSlideChange={() => console.log("slide change")}
			>
				{images.map((img, index) => {
					return (
						<React.Fragment key={index}>
							<SwiperSlide>
								<div className="relative w-56 h-56 rounded-lg">
									<Image
										src={img}
										alt=""
										fill
										className="object-contain object-center"
									/>
								</div>
							</SwiperSlide>
						</React.Fragment>
					);
				})}
			</Swiper>
		</div>
	);
}
