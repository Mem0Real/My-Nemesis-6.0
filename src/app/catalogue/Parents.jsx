import Link from "next/link";
import Image from "next/image";
import { lazy } from "react";

// import SlickCarousel from "./components/SlickCarousel";
// import Carousel from "./components/Carousel";

const Carousel = lazy(() => import("./components/Carousel"));

export default async function Parents({ categoryId, parents }) {
	return (
		<Carousel length={parents.length}>
			{parents.map((parent) => {
				return (
					parent.CategoryId === categoryId && (
						<div
							key={parent.id}
							className={`flex flex-col items-center justify-between p-5 my-12 ${
								parent?.image?.length < 4 && "self-center mx-auto"
							}`}
						>
							<div className="border border-neutral-400 border-b-0 rounded-t-2xl drop-shadow-xl">
								<div className="relative w-72 h-60 mx-auto">
									{parent.image ? (
										<Image
											src={parent.image}
											srcSet={parent.id}
											alt={parent.id}
											fill={true}
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											className="object-center object-contain w-full h-full rounded-[2rem] pointer-events-none"
											priority={true}
										/>
									) : (
										<div className="w-56 h-56 mx-auto flex flex-col items-center justify-center text-neutral-700 dark:text-neutral-300">
											<h1 className="text-xs italic">No Image</h1>
										</div>
									)}
								</div>
							</div>
							<div className="border border-neutral-400 rounded-b-2xl text-center text-sm py-5 hover:underline underline-offset-2 w-72">
								<Link
									key={parent.id}
									href={`/catalogue/${categoryId}/${parent.id}`}
								>
									<h1 className="w-full">{parent.name}</h1>
								</Link>
							</div>
						</div>
					)
				);
			})}
		</Carousel>
	);
}
