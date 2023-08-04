import { Suspense } from "react";

import { getDetail } from "@/app/catalogue/lib/fetchFunctions";
import Children from "./Children";

export default async function Parent({ categoryId, parentId }) {
  const parentData = await getDetail("parents", parentId);

  return (
    <>
      <h1 className="flex-none text-lg md:mb-12 border border-x-0 border-3 rounded-md border-neutral-800 dark:border-neutral-200 md:px-6 md:py-2">
        {parentData.name}
      </h1>
      <p className="h-24 text-center mt-4 md:mt-2">{parentData.description}</p>
      <div className="flex-initial min-h-screen w-full flex flex-col items-center">
        <Suspense fallback={<h1>Loading children...</h1>}>
          <Children categoryId={categoryId} parentId={parentId} />
        </Suspense>
      </div>
    </>
  );
}
