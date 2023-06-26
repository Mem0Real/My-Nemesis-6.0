"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import styles from "./swiper.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

export default function SwiperCarousel({ categoryId, parents }) {
  return (
    <Swiper
      modules={[Navigation, Scrollbar, A11y]}
      slidesPerView={3}
      navigation
      scrollbar={{ draggable: true }}
      breakpoints={{
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 3,
          spaceBetween: 25,
        },
        // when window width is >= 1024px
        1024: {
          slidesPerView: 4,
          spaceBetween: 25,
        },
      }}
      className={styles.className}
    >
      {parents.map((parent) => {
        return (
          <SwiperSlide key={parent.id}>
            <div className="flex flex-col items-center group md:my-5">
              <Link
                key={parent.id}
                href={`/collection/${categoryId}/${parent.id}`}
              >
                <div className="relative w-56 h-44 border border-black rounded-t-3xl shadow-inner shadow-neutral-950 hover:shadow-neutral-700 transition-all ease-in-out">
                  {parent.image && (
                    <Suspense
                      fallback={
                        <h1 className="text-sm text-black">Loading Image</h1>
                      }
                    >
                      <Image
                        src={parent.image}
                        alt={parent.id}
                        fill={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="absolute object-contain"
                        priority={true}
                      />
                    </Suspense>
                  )}
                </div>
                <div className="h-12 flex flex-col items-start ps-4 pt-3 rounded-b-2xl w-full bg-neutral-800 text-neutral-200 shadow-xl shadow-neutral-950 transition-all ease-in-out duration-500 group-hover:shadow-neutral-700 ">
                  <h1>{parent.name}</h1>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
