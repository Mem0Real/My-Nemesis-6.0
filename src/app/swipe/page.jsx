import Slider from "../catalogue/components/Slider";

export default function Swipe() {
	return (
		<div className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 pt-24 min-h-screen w-screen">
			<div className="flex flex-col justify-center items-center w-[90%] mx-auto">
				<Slider />
			</div>
		</div>
	);
}
