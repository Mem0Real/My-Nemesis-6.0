import Link from "next/link";

export default async function Parents({ children }) {
	return (
		<div className="flex flex-col justify-evenly gap-6 items-center w-full">
			<p className="text-neutral-700 dark:text-neutral-300 text-2xl font-medium underline">
				Parent Categories{" "}
			</p>

			{children.map(async (parent) => {
				return (
					<div
						key={parent.id}
						className="flex flex-col justify-center items-center"
					>
						<ul className="list-disc">
							<Link href={`/catalogue/${parent.CategoryId}/${parent.id}`}>
								<li>{parent.name}</li>
							</Link>
						</ul>
					</div>
				);
			})}
		</div>
	);
}
