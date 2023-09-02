import TopMask from "./(landing)/components/TopMask";
import BottomMask from "./(landing)/components/BottomMask";
import BodySection from "./(landing)/components/(sections)/BodySection";
import Parallax from "./(landing)/components/Parallax";
import TouchSmoothScroller from "./components/TouchSmoothScroller";

export default function Home() {
	return (
		<>
			<TouchSmoothScroller />
			<div className="relative min-h-screen h-fit min-w-screen flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 z-0">
				<Parallax />

				<div className="bg-neutral-100 dark:bg-neutral-800 backdrop-blur-lg z-20 mx-auto">
					<div className=" mt-6 md:mt-12 lg:mt-24">
						<TopMask />
					</div>
					<BodySection />
					<div className="mb-6 md:mb-12 lg:mb-24">
						<BottomMask />
					</div>
				</div>
			</div>
		</>
	);
}
