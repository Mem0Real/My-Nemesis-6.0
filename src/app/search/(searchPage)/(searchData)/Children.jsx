import Link from "next/link";

export default function Children({ data, children }) {
	return (
		<div className="flex flex-col justify-evenly gap-6 items-center w-full">
			<p className="text-neutral-700 dark:text-neutral-300 text-2xl font-medium underline">
				Child Categories{" "}
			</p>

			{children.map((child) => {
				return (
					<div
						key={child.id}
						className="flex flex-col justify-center items-center"
					>
						<ul className="list-disc">
							<Link
								href={`/catalogue/${child.CategoryId}/${child.ParentId}/${child.id}`}
							>
								<li>{child.name}</li>
							</Link>
						</ul>
					</div>
				);
			})}
		</div>
	);
}
