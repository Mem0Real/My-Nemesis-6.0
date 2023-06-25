import CarouselData from "./carouselData";
import SplideCarousel from "./components/SplideCarousel";

export default function Parents({ categoryId, parents }) {
  let parentsData;
  parentsData = parents.sort((a, b) => {
    const name1 = a.name.toUpperCase();
    const name2 = b.name.toUpperCase();

    if (name1 < name2) return -1;
    else if (name1 > name2) return 1;
    else return 0;
  });
  return (
    <SplideCarousel categoryId={categoryId} parentsData={parentsData}>
      <CarouselData parentsData={parentsData} />
    </SplideCarousel>
  );
}
