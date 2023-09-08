"use server";
import { prisma } from "@/lib/prisma";
import SideBarComponent from "./SideBarComponent";

async function getData() {
	const data = prisma.categories.findMany({
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
							items: {
								orderBy: { id: "asc" },
								select: { id: true, name: true },
							},
						},
					},
				},
			},
		},
	});

	return data;
}

export default async function SideBarBase() {
	const data = await getData();

	return <SideBarComponent data={data} />;
}
