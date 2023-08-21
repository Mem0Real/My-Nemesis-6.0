import HeaderSection from "./(landing)/components/(sections)/HeaderSection";
import { Suspense } from "react";
import MainSection from "./(landing)/components/(sections)/MainSection";
import BottomSection from "./(landing)/components/(sections)/BottomSection";
import Background from "./(landing)/components/Background";
import Motto from "./(landing)/components/Motto";

export default async function Home() {
  return (
    <>
      <div className="relative ">
        <Background />
        <HeaderSection />

        <Motto />

        <Suspense fallback={<h1>Loading...</h1>}>
          <MainSection />
        </Suspense>

        <div className="bg-neutral-100 dark:bg-neutral-800 backdrop-blur-lg">
          <BottomSection />
        </div>
      </div>
    </>
  );
}
