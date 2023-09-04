import { Suspense } from "react";

import { getDetail } from "@/app/catalogue/lib/fetchFunctions";
import Children from "./Children";
import ChildLoader from "../../components/(loader)/ChildLoader";

export default async function Parent({ categoryId, parentId }) {
	const parentData = await getDetail("parents", parentId);

	return (
		<>
			<div className="w-full flex flex-col items-center justify-center py-20 md:py-24 lg:py-28">
				<h1 className="flex-none mb-12 border border-x-0 border-3 rounded-md border-neutral-800 dark:border-neutral-200 md:px-6 md:py-4 text-4xl md:text-5xl lg:text-6xl font-semibold text-center w-fit">
					{parentData.name}
				</h1>
				<p className="h-24 text-center mt-4 md:mt-2 text-xl">
					{parentData.description}
				</p>
			</div>
			<div className="flex-initial min-h-screen w-full flex flex-col items-center">
				<Suspense fallback={<ChildLoader />}>
					<Children parent={parentData} categoryId={categoryId} />
				</Suspense>
			</div>
		</>
	);
}
