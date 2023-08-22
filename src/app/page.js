import HeaderSection from "./(landing)/components/(sections)/HeaderSection";
import { Suspense } from "react";
// import MainSection from "./(landing)/components/(sections)/MainSection";
// import BottomSection from "./(landing)/components/BottomMask";
import TopMask from "./(landing)/components/TopMask";
import BottomMask from "./(landing)/components/BottomMask";
import BodySection from "./(landing)/components/(sections)/BodySection";

export default function Home() {
  return (
    <div className="relative ">
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
