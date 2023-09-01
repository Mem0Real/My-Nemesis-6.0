import Link from "next/link";

export default function Categories({ children }) {
	return (
		<div className="flex flex-col justify-evenly gap-6 items-center w-full">
			<p className="text-neutral-700 dark:text-neutral-300 text-2xl font-medium underline">
				Main Categories{" "}
			</p>
			{children.map((category) => {
				return (
					<div
						key={category.id}
						className="flex flex-col justify-center items-center"
					>
						<ul className="list-disc">
							<Link href={`/catalogue/${category.id}`}>
								<li>{category.name}</li>
							</Link>
						</ul>
					</div>
				);
			})}
		</div>
	);
}
