import Link from "next/link";
import { Suspense } from "react";

import { getDetail } from "@/app/collection/lib/fetchFunctions";
import Parents from "./Parents";

export default async function Category({ categoryId }) {
  const categoryData = await getDetail("categories", categoryId);

  return (
    <>
      <h1 className="flex-none text-lg md:mb-12 border border-x-0 border-3 rounded-md border-black md:px-6 md:py-2">
        {categoryData.name}
      </h1>
      <p className="h-24 text-center mt-4 md:mt-2">
        {categoryData.description}
      </p>
      <div className="flex-initial min-h-screen w-full">
        <Suspense fallback={<h1>Loading parents...</h1>}>
          <Parents categoryId={categoryId} />
        </Suspense>
      </div>
    </>
  );
}
