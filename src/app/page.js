import HeaderSection from "./(landing)/components/(sections)/HeaderSection";
import { Suspense } from "react";
import ServiceShow from "./(landing)/components/ServiceShow";
import MainSection from "./(landing)/components/(sections)/MainSection";
import BottomSection from "./(landing)/components/(sections)/BottomSection";

export default async function Home() {
  return (
    <div className="relative bg-neutral-100 dark:bg-neutral-900">
      <HeaderSection />
      {/* <div className="flex flex-col gap-12"> */}
      {/* <Suspense fallback={<h1>Loading...</h1>}>
          <ProductDataProvider />
        </Suspense>

        <Suspense fallback={<h1>Loading...</h1>}>
          <CategoryDataProvider />
        </Suspense> */}

      <Suspense fallback={<h1>Loading...</h1>}>
        <MainSection />
      </Suspense>

      <BottomSection />
      {/* </div> */}
    </div>
  );
}
