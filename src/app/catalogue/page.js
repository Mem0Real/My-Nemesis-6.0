import { Suspense, lazy } from "react";
import PageWrapper from "../components/PageWrapper";
// import Categories from "./Categories";
const Categories = lazy(() => import("./Categories"));

import { getCollectionData } from "./lib/fetchFunctions";
import Image from "next/image";

import CatalogueLoader from "./components/(loader)/CatalogueLoader";

export default async function CollectionPage() {
	// TODO no need to fetch prev parent id because all children have consecutive parents ids
	const categories = await getCollectionData("categories");

	if (!categories[0].name) return notFound();
	return (
		<PageWrapper>
			<div className="flex flex-col items-center gap-20 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 min-h-screen z-10">
				<div className="fixed h-screen w-screen z-0 bg-neutral-100/60 dark:bg-neutral-800/60">
					<Image
						src="/images/CatalogueBg.png"
						fill
						sizes="(max-width: 1366px) 100vw"
						alt="catalogue"
						className="object-cover object-center"
						priority
					/>
				</div>
				<Suspense fallback={<CatalogueLoader />}>
					<Categories categories={categories} />
				</Suspense>
			</div>
		</PageWrapper>
	);
}
