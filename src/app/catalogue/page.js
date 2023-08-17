import { Suspense } from "react";
import PageWrapper from "../components/PageWrapper";
import Categories from "./Categories";

export default function CollectionPage() {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center gap-20 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 min-h-screen">
        <div className="w-full flex flex-col items-center justify-center py-8 md:py-10 lg:py-12 mb-2 shadow-xl shadow-blue-600/20 dark:shadow-blue-400/10 text-neutral-800 dark:text-neutral-200">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight italic">
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
