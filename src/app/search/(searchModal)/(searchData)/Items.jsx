import Link from "next/link";
import { useSearchDataContext } from "../SearchModal";
import { useSearchContext } from "../../SearchBase";

export default function Items({ children }) {
	const { closeSearch } = useSearchContext();
	const { data } = useSearchDataContext();

	return (
		<div className="flex flex-col itmes-start gap-4">
			<h1 className="text-start ms-3 text-lg font-semibold underline w-full">
				Products
			</h1>
			<div className="ms-5 border-l border-neutral-500 flex flex-col items-start gap-3">
				{children.map((item, index) => {
					return (
						<div key={item.id} className="ps-5" tabIndex={index === 0 ? 0 : -1}>
							<Link
								href={`/catalogue/${item.CategoryId}/${item.ParentId}/${item.ChildId}/${item.id}`}
							>
								<p onClick={closeSearch} className="capitalize">
									{item.name}
								</p>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
}
