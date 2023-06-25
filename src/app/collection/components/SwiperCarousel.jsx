"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

export default function SwiperCarousel({ categoryId, parentsData }) {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {parentsData.map((parent) => {
        return <SwiperSlide>{parent.name}</SwiperSlide>;
      })}
    </Swiper>
  );
}
