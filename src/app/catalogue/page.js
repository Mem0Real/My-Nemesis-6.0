import { Suspense } from "react";
import PageWrapper from "../components/PageWrapper";
import Categories from "./Categories";

export default function CollectionPage() {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center gap-20 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 min-h-screen">
        <div className="w-full flex flex-col items-center justify-center py-16 md:py-20 lg:py-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold">
            Catalogue
          </h1>
        </div>
        <Suspense
          fallback={
            <h1 className="text-neutral-800 dark:text-neutral-200 m-auto">
              Loading Categories...
            </h1>
          }
        >
          <Categories />
        </Suspense>
      </div>{" "}
    </PageWrapper>
  );
}
