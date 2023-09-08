import Skeleton from "@/app/components/Skeleton";

export default function ButtonLoader() {
	return (
		<div className="flex items-center justify-center gap-12 bg-transparent">
			<Skeleton className="w-24 h-10 outline outline-1 outline-offset-2 outline-neutral-400 dark:outline-neutral-600 rounded-lg" />
			<Skeleton className="w-24 h-10 outline outline-1 outline-offset-2 outline-neutral-400 dark:outline-neutral-600 rounded-lg" />
		</div>
	);
}
