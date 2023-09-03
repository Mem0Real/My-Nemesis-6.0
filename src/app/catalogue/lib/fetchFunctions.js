import { prisma } from "@/lib/prisma";

let url;
if (process.env.NODE_ENV === "development")
	url = process.env.NEXT_PUBLIC_LOCAL_URL;
else if (process.env.NODE_ENV === "production")
	url = process.env.NEXT_PUBLIC_BUILD_URL;

export async function getCollectionData(entry, reference) {
	let include;

	if (entry === "categories") {
		include = "parents";
	} else if (entry === "parents") {
		include = "children";
	} else if (entry === "children") {
		include = "items";
	} else {
		include = "";
	}

	let res;
	if (entry !== "items") {
		res = await prisma[entry].findMany({
			orderBy: {
				id: "asc",
			},
			where: reference,
			select: {
				id: true,
				name: true,
				description: true,
				image: true,
				[include]: {
					orderBy: {
						id: "asc",
					},
				},
			},
		});
	} else {
		res = await prisma[entry].findMany({
			orderBy: {
				id: "asc",
			},
			where: reference,
		});
	}
	return res;
}

export async function getDetail(entry, id) {
	const res = await prisma[entry].findUnique({
		where: { id: id },
	});
	return res;
}

export async function getParams(entry) {
	const res = await prisma[entry].findMany({
		select: { id: true },
		orderBy: { id: "asc" },
	});
	return res;
}
