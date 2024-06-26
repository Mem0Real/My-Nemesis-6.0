"use server";

import { prisma } from "@/lib/prisma";

export async function fetchProducts() {
	const products = await prisma.items.findMany({
		where: {
			images: {
				isEmpty: false,
			},
		},
		select: {
			id: true,
			CategoryId: true,
			ParentId: true,
			ChildId: true,
			name: true,
			images: true,
			price: true,
		},
		take: 10,
	});

	return products;
}

export async function fetchCategories() {
	const categories = prisma.categories.findMany({
		select: {
			id: true,
			name: true,
			image: true,
		},
		orderBy: { id: "asc" },
	});

	return categories;
}
