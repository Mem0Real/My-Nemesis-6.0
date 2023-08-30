import { Suspense } from "react";

import { getDetail } from "@/app/catalogue/lib/fetchFunctions";
import Parents from "./Parents";

import ParentLoader from "../components/(loader)/ParentLoader";

export default async function Category({ categoryId }) {
	const categoryData = await getDetail("categories", categoryId);

	return (
		<>
			<div className="w-full flex flex-col items-center justify-center py-20 md:py-24 lg:py-28">
				<h1 className="flex-none mb-12 border border-x-0 border-3 rounded-md border-neutral-800 dark:border-neutral-200 md:px-6 md:py-4 text-4xl md:text-5xl lg:text-6xl font-semibold text-center w-fit">
					{categoryData.name}
				</h1>
				<p className="h-24 text-center mt-4 md:mt-2 text-3xl">
					{categoryData.description}
				</p>
			</div>
			<div className="flex-initial min-h-screen w-full flex flex-col items-center">
				<Suspense fallback={<ParentLoader />}>
					<Parents categoryId={categoryId} />
				</Suspense>
			</div>
		</>
	);
}
