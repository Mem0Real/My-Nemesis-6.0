import Link from "next/link";

export default function Items({ data, children }) {
	return (
		<div className="flex flex-col justify-evenly gap-6 items-center w-full">
			<p className="text-neutral-700 dark:text-neutral-300 text-2xl font-medium underline">
				Products
			</p>

			{children[0].map((item) => {
				return (
					<div
						key={item.id}
						className="flex flex-col justify-center items-center"
					>
						<ul className="list-disc">
							<Link
								href={`/catalogue/${item.CategoryId}/${item.ParentId}/${item.ChildId}/${item.id}`}
							>
								<li>{item.name}</li>
							</Link>
						</ul>
					</div>
				);
			})}
		</div>
	);
}
