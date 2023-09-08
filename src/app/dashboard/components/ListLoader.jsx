import Skeleton from "@/app/components/Skeleton";

export default function ListLoader() {
	<div className="flex flex-col items-center justify-center gap-12 bg-transparent w-screen px-12">
		<Skeleton className="w-44 h-8 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50" />
		<Skeleton className="self-start w-44 h-8 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50 rounded-sm" />
		<div className="w-screen px-5 flex flex-col justify-center mt-10 pb-5 border-b border-neutral-800 dark:border-neutral-200">
			<div className="flex items-center w-full">
				<div className="basis-1/3">
					<Skeleton className="w-24 h-5 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50" />
				</div>
				<div className="basis-2/3">
					<Skeleton className="w-24 h-5 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50" />
				</div>
			</div>
		</div>
		<div className="w-screen px-5 flex flex-col gap-5 h-[70vh]">
			<div className="flex items-center w-full justify-between">
				<div className="flex items-center gap-4">
					<Skeleton className="w-8 h-8 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50 rounded-full" />
					<div className="w-[25vh]">
						<Skeleton className="w-full h-5 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50" />
					</div>
				</div>
				<div className="w-[50vh]">
					<Skeleton className="w-full h-5 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50" />
				</div>
				<Skeleton className="w-32 h-10 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50" />
			</div>
			<div className="flex items-center w-full justify-between">
				<div className="flex items-center gap-4">
					<Skeleton className="w-8 h-8 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50 rounded-full" />
					<div className="w-[25vh]">
						<Skeleton className="w-full h-5 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50" />
					</div>
				</div>
				<div className="w-[50vh]">
					<Skeleton className="w-full h-5 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50" />
				</div>
				<Skeleton className="w-32 h-10 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50" />
			</div>
			<div className="flex items-center w-full justify-between">
				<div className="flex items-center gap-4">
					<Skeleton className="w-8 h-8 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50 rounded-full" />
					<div className="w-[25vh]">
						<Skeleton className="w-full h-5 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50" />
					</div>
				</div>
				<div className="w-[50vh]">
					<Skeleton className="w-full h-5 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50" />
				</div>
				<Skeleton className="w-32 h-10 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50" />
			</div>
			<div className="flex items-center w-full justify-between">
				<div className="flex items-center gap-4">
					<Skeleton className="w-8 h-8 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50 rounded-full" />
					<div className="w-[25vh]">
						<Skeleton className="w-full h-5 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50" />
					</div>
				</div>
				<div className="w-[50vh]">
					<Skeleton className="w-full h-5 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50" />
				</div>
				<Skeleton className="w-32 h-10 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50" />
			</div>
			<div className="flex items-center w-full justify-between">
				<div className="flex items-center gap-4">
					<Skeleton className="w-8 h-8 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50 rounded-full" />
					<div className="w-[25vh]">
						<Skeleton className="w-full h-5 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50" />
					</div>
				</div>
				<div className="w-[50vh]">
					<Skeleton className="w-full h-5 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50" />
				</div>
				<Skeleton className="w-32 h-10 outline outline-1 outline-offset-2 outline-neutral-400/50 dark:outline-neutral-600/50" />
			</div>
		</div>
	</div>;
}
