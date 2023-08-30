import { prisma } from "@/lib/prisma";
import ProductList from "./ProductList";
import PageWrapper from "../components/PageWrapper";
import Image from "next/image";

async function getMenuData() {
	let menu;
	try {
		menu = await prisma.categories.findMany({
			orderBy: { id: "asc" },
			select: {
				id: true,
				parents: {
					orderBy: { id: "asc" },
					select: {
						id: true,
						children: {
							orderBy: { id: "asc" },
							select: {
								id: true,
							},
						},
					},
				},
			},
		});
		return menu;
	} catch (error) {
		return { error: "Error fetching data. \n Please try again later." };
	}
}

async function getProducts(searchParams) {
	const search = searchParams.search || undefined;
	const sort = searchParams.sort || "asc";

	const minPrice = searchParams.minPrice || undefined;
	const maxPrice = searchParams.maxPrice || undefined;

	const filter = searchParams.filter || undefined;
	let decodedFilter = decodeURIComponent(filter);
	let filterArray = decodedFilter.split(",");

	let check, range;

	// Filter price range
	if (minPrice && !maxPrice) {
		range = {
			price: {
				gte: parseInt(minPrice),
			},
		};
	} else if (!minPrice && maxPrice) {
		range = {
			price: {
				lte: parseInt(maxPrice),
			},
		};
	} else if (minPrice && maxPrice) {
		range = {
			price: {
				gte: parseInt(minPrice),
				lte: parseInt(maxPrice),
			},
		};
	} else range = undefined;

	// Conditions
	if (search && !filter) {
		if (minPrice || maxPrice) {
			check = {
				AND: [
					range,
					{
						OR: [
							{ name: { contains: search, mode: "insensitive" } },
							{ id: { contains: search, mode: "insensitive" } },
						],
					},
				],
			};
		} else {
			check = {
				OR: [
					{ name: { contains: search, mode: "insensitive" } },
					{ id: { contains: search, mode: "insensitive" } },
				],
			};
		}
	} else if (!search && filter) {
		if (minPrice || maxPrice) {
			check = {
				AND: [range, { CategoryId: { in: filterArray } }],
			};
		} else {
			check = { CategoryId: { in: filterArray } };
		}
	} else if (search && filter) {
		if (minPrice || maxPrice) {
			check = {
				AND: [
					range,
					{ CategoryId: { in: filterArray } },
					{
						OR: [
							{ name: { contains: search, mode: "insensitive" } },
							{ id: { contains: search, mode: "insensitive" } },
						],
					},
				],
			};
		} else {
			check = {
				AND: [
					{ CategoryId: { in: filterArray } },
					{
						OR: [
							{ name: { contains: search, mode: "insensitive" } },
							{ id: { contains: search, mode: "insensitive" } },
						],
					},
				],
			};
		}
	} else {
		if (minPrice || maxPrice) check = range;
		else check = undefined;
	}

	// Pagination
	let limit, page, skip, count, totalPage;
	limit = searchParams.limit * 1 || 15;
	page = searchParams.page * 1 || 1;
	skip = searchParams.skip * 1 || limit * (page - 1);

	// Count
	count = await prisma.items.count({
		where: check,
	});
	totalPage = Math.ceil(count / limit);

	const ranger = await getRange(search, filter, filterArray);

	// MainData
	try {
		const products = await prisma.items.findMany({
			where: check,
			orderBy: { name: sort },
			take: limit,
			skip: skip,
		});
		return { products, totalPage, ranger };
	} catch (error) {
		return {
			error: error || "Error fetching data. \n Please try again later.",
		};
	}
}

async function getRange(search, filter, filterArray) {
	let check;

	// Conditions
	if (search && !filter) {
		check = {
			OR: [
				{ name: { contains: search, mode: "insensitive" } },
				{ id: { contains: search, mode: "insensitive" } },
			],
		};
	} else if (!search && filter) {
		check = { CategoryId: { in: filterArray } };
	} else if (search && filter) {
		check = {
			AND: [
				{ CategoryId: { in: filterArray } },
				{
					OR: [
						{ name: { contains: search, mode: "insensitive" } },
						{ id: { contains: search, mode: "insensitive" } },
					],
				},
			],
		};
	} else {
		check = undefined;
	}

	try {
		// Min Price
		const minPrice = await prisma.items.aggregate({
			where: check,
			_min: {
				price: true,
			},
		});

		// Max Price
		const maxPrice = await prisma.items.aggregate({
			where: check,
			_max: {
				price: true,
			},
		});

		return { minPrice, maxPrice };
	} catch (error) {
		return {
			error: error || "Error getting range. \n Please try again later.",
		};
	}
}
export default async function ProductsPage({ params, searchParams }) {
	try {
		const menu = await getMenuData();

		const { products, totalPage, ranger } = await getProducts(searchParams);
		return (
			<PageWrapper>
				<div className="flex flex-col items-center gap-20 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 min-h-screen z-10">
					<div className="fixed h-screen w-screen z-0 bg-neutral-100/40 dark:bg-neutral-800/40">
						<Image
							src="/images/ProductBg3.png"
							fill
							sizes="(max-width: 768px) 100vw"
							alt="Product"
							className="object-contain object-center"
							priority
						/>
					</div>
					<ProductList
						menu={menu}
						products={products}
						totalPage={totalPage}
						range={ranger}
					/>
				</div>
			</PageWrapper>
		);
	} catch (error) {
		// throw new Error("Error fetching data! Please try again later. ");
		throw new Error(error);
	}
}
