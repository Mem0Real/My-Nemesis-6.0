import { Suspense } from "react";
import SwiperCarousel from "./components/SwiperCarousel";

export default function Parents({ categoryId, parents }) {
  let parentsData;
  parentsData = parents.sort((a, b) => {
    const name1 = a.name.toUpperCase();
    const name2 = b.name.toUpperCase();

    if (name1 < name2) return -1;
    else if (name1 > name2) return 1;
    else return 0;
  });

  parentsData = parentsData.map(
    (parent) => parent.CategoryId === categoryId && parent
  );

  return (
    <Suspense fallback={<h1>Loading Carousel</h1>}>
      <SwiperCarousel categoryId={categoryId} parentsData={parentsData} />
    </Suspense>
  );
}
