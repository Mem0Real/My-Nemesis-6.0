import dynamic from "next/dynamic";
import { Suspense } from "react";

const Categories = dynamic(() => import("./categories"));

export default function CollectionPage() {
  return (
    <div className="flex flex-col items-center gap-20 text-neutral-800 mt-6">
      <div className="flex flex-col items-center gap-7">
        <h1 className="text-4xl underline underline-offset-2">Welcome!</h1>
        <p className="md:ps-5">Take a look at the products we offer</p>
      </div>
      <Suspense
        fallback={<h1 className="text-black m-auto">Loading Categories</h1>}
      >
        <Categories />
      </Suspense>
    </div>
  );
}
