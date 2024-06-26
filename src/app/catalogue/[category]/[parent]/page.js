import { Suspense } from "react";
import Link from "next/link";

import Parent from "./Parent";

import ParentLoader from "../../components/(loader)/ParentLoader";
import PageWrapper from "@/app/components/PageWrapper";

export async function generateMetadata({ params: { parent } }) {
	let firstLetter = parent[0];
	firstLetter = firstLetter.toUpperCase();
	let parentName = firstLetter + parent.slice(1);

	return {
		title: `Nemesis - ${parentName}`,
	};
}

export default async function ParentData({ params: { parent, category } }) {
	let currentParent = parent;
	let currentCategory = category;

	const content = (
		<div className="flex flex-col justify-between items-center text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 pt-6 w-screen min-h-screen relative">
			<Suspense fallback={<ParentLoader />}>
				<Parent categoryId={currentCategory} parentId={currentParent} />
			</Suspense>
			<Link
				href={`/catalogue/${currentCategory}`}
				className="absolute top-[68px] right-0 md:right-12 bg-transparent rounded-md px-4 py-2 text-neutral-800 dark:text-neutral-200 hover:outline outline-1 outline-neutral-800 dark:outline-neutral-200 z-20"
			>
				Back
			</Link>
		</div>
	);

	return (
		<PageWrapper>
			<div className="relative flex flex-col items-center">{content}</div>
		</PageWrapper>
	);
}
