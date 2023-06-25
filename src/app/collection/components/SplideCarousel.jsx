"use client";

import Link from "next/link";
import { Splide, SplideSlide } from "splide-nextjs/react-splide";
import "splide-nextjs/splide/dist/css/themes/splide-skyblue.min.css";

export default function SplideCarousel({ categoryId, parentsData }) {
  return (
    <Splide aria-label="Parent Data">
      {parentsData.map((parent) => {
        return (
          <SplideSlide key={parent.id}>
            <div className="h-56">
              <Link
                key={parent.id}
                href={`/collection/${categoryId}/${parent.id}`}
              >
                {parent.name}
              </Link>
            </div>
          </SplideSlide>
        );
      })}
    </Splide>
  );
}
