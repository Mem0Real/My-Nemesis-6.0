import { Suspense } from "react";

import Items from "./Items";
import { getDetail } from "@/app/collection/lib/fetchFunctions";

export default async function Child({ categoryId, parentId, childId }) {
  const childData = await getDetail("children", childId);

  return (
    <>
      <h1 className="flex-none text-lg md:mb-12 border border-x-0 border-3 rounded-md border-neutral-800 dark:border-neutral-200 md:px-6 md:py-2">
        {childData.name}
      </h1>
      <p className="h-24 text-center mt-4 md:mt-2">{childData.description}</p>
      <div className="flex-initial min-h-screen w-full flex flex-col items-center">
        <Suspense fallback={<h1>Loading Items...</h1>}>
          <Items
            categoryId={categoryId}
            parentId={parentId}
            childId={childId}
          />
        </Suspense>
      </div>
    </>
  );
}
