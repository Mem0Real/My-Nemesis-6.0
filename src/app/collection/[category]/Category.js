import { Suspense } from "react";

import { getDetail } from "@/app/collection/lib/fetchFunctions";
import Parents from "./Parents";

export default async function Category({ categoryId }) {
  const categoryData = await getDetail("categories", categoryId);

  return (
    <>
      <h1 className="flex-none text-lg md:mb-12 border border-x-0 border-3 rounded-md border-neutral-800 dark:border-neutral-200 md:px-6 md:py-2">
        {categoryData.name}
      </h1>
      <p className="h-24 text-center mt-4 md:mt-2">
        {categoryData.description}
      </p>
      <div className="flex-initial min-h-screen w-full flex flex-col items-center">
        <Suspense fallback={<h1 className="text-3xl">Loading parents...</h1>}>
          <Parents categoryId={categoryId} />
        </Suspense>
      </div>
    </>
  );
}
