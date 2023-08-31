"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchContext } from "../../SearchBase";

export default function Categories({ children }) {
	const firstElementRef = useRef();

	const handleKeyDown = (event) => {
		if (event.key === "Enter" && firstElementRef.current) {
			firstElementRef.current.click();
		}
	};

	const { closeSearch } = useSearchContext();

	return (
		<div className="flex flex-col itmes-start gap-4">
			<h1 className="text-start ms-3 text-lg font-semibold underline w-full">
				Categories
			</h1>
			<div className="ms-5 border-l border-neutral-500 flex flex-col items-start gap-3">
				{children[0].map((category, index) => {
					return (
						<button
							key={category.id}
							className="ps-5"
							tabIndex={index === 0 ? 0 : -1}
							ref={index === 0 ? firstElementRef : null}
							onKeyDown={handleKeyDown}
						>
							<Link href={`/catalogue/${category.id}`}>
								<p onClick={closeSearch}>{category.name}</p>
							</Link>
						</button>
					);
				})}
			</div>
		</div>
	);
}
