import HeaderSection from "./(landing)/components/(sections)/HeaderSection";
import { Suspense } from "react";
import TopMask from "./(landing)/components/TopMask";
import BottomMask from "./(landing)/components/BottomMask";
import BodySection from "./(landing)/components/(sections)/BodySection";
import SmoothScroller from "./components/SmoothScroller";
import ScrollBase from "./components/ScrollBase";

export default function Home() {
  return (
    <div className="relative min-h-screen h-fit  min-w-screen flex flex-col items-center bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
      <ScrollBase />
      <HeaderSection />

      <div className="bg-neutral-100 dark:bg-neutral-800 backdrop-blur-lg">
        <TopMask />
        <Suspense fallback={<h1>Loading...</h1>}>
          <BodySection />
        </Suspense>
        <BottomMask />
      </div>
    </div>
  );
}
