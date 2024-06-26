import Link from "next/link";
import { fetchCategories } from "../(landing)/util/getData";
import FooterComponents from "./FooterComponents";
import Image from "next/image";

export default async function Footer() {
	const categories = await fetchCategories();

	return (
		<div className="flex flex-col bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 border-t border-neutral-950/80 dark:border-neutral-50/80 backdrop-blur-sm z-10">
			<div className="pb-8 md:pb-12 flex flex-wrap items-start sm:items-center md:items-start justify-around gap-12 lg:mt-16 mt-8 w-[95%] mx-auto">
				<div className="flex flex-col items-center gap-4 justify-evenly">
					<h1 className="text-xl font-bold text-black dark:text-white pb-6 w-full text-center md:text-start">
						Store Location
					</h1>
					<div className="flex flex-col gap-5 justify-center items-center md:items-start text-base">
						<p>HabteGiorgis Square</p>
						<p>Addis Ababa, Ethiopia</p>
						<p>MyNemesis@gmail.com</p>
						<p>011-1-12-34-56</p>
					</div>
					<div className="self-center md:self-start py-4">
						<FooterComponents />
					</div>
				</div>

				<div className="hidden md:flex flex-col items-center gap-4 justify-evenly">
					<h1 className="text-xl font-bold text-black dark:text-white pb-4 w-full text-center">
						Shop
					</h1>
					<div className="flex flex-col gap-3 justify-center items-center text-base w-full">
						<Link href="/products" className="pb-3">
							Shop All
						</Link>
						{categories.map(({ id }) => {
							return (
								<Link
									key={id}
									href={`/catalogue/${id}`}
									className="capitalize font-medium"
								>
									{id}
								</Link>
							);
						})}
					</div>
				</div>

				<div className="flex flex-col items-center gap-4 justify-evenly">
					<h1 className="text-xl font-bold text-black dark:text-white pb-6 w-full text-center md:text-start">
						Company
					</h1>
					<div className="flex flex-col gap-5 justify-center items-center md:items-center text-base">
						<Link href="/services">Services</Link>
						<Link href="/contact">Contact Us</Link>
					</div>
				</div>
			</div>
			<div
				className="h-fit text-xl flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center shadow-inner 
    shadow-neutral-500 bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 px-5"
			>
				<p>Ethio-Machineries</p>
				<p className="text-sm font-light">©2023 All Rights Reserved!</p>
				<div className="self-start w-full md:w-44 lg:w-56 flex justify-evenly md:justify-between items-center text-sm font-light text-center">
					<p className="flex-1">Web developed by:</p>
					<Link
						href="https://github.com/Mem0Real"
						className="relative flex-1 w-24 h-24"
						target="_blank"
					>
						<Image
							src="/images/Mem0real.webp"
							alt="Mem0Real"
							fill
							sizes="(max-width: 768px) 100vw"
							className="object-contain object-center"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
}
