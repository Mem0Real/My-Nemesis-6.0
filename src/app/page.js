import TopMask from "./(landing)/components/TopMask";
import BottomMask from "./(landing)/components/BottomMask";
import BodySection from "./(landing)/components/(sections)/BodySection";
import Parallax from "./(landing)/components/Parallax";
import TouchSmoothScroller from "./components/TouchSmoothScroller";

// TODO Design skeleton for landing page
export default function Home() {
	return (
		<>
			<TouchSmoothScroller />
			<div className="relative min-h-screen h-fit min-w-screen flex flex-col items-center justify-center gap-0 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 z-0">
				<Parallax />

				<div className="bg-neutral-100 dark:bg-neutral-800 backdrop-blur-lg z-20 mx-auto pt-28 pb-12 w-screen">
					<TopMask />
					<BodySection />
					<BottomMask />
				</div>
			</div>
		</>
	);
}
