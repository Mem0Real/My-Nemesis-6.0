import { Suspense } from "react";
import SwiperCarousel from "./components/SwiperCarousel";

export default function Parents({ categoryId, parents }) {
  return (
    <Suspense fallback={<h1>Loading carousel</h1>}>
      <SwiperCarousel categoryId={categoryId} parents={parents} />
    </Suspense>
  );
}
