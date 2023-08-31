import Carousel from "../catalogue/components/Carousel";

export default function CarouselPage() {
	const images = [
		"/images/1.png",
		"/images/2.png",
		"/images/3.png",
		"/images/4.png",
		"/images/5.png",
		"/images/6.png",
		"/images/7.png",
		"/images/8.png",
		"/images/9.png",
		"/images/10.png",
		"/images/11.png",
		"/images/12.png",
	];
	return (
		<div className="bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 pt-24">
			<h1 className="text-5xl w-full text-center">My Carousel</h1>
			<Carousel images={images} />
		</div>
	);
}
