import { prisma } from "@/lib/prisma";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile, unlink } from "fs/promises";
import fs from "fs";

import { revalidatePath, revalidateTag } from "next/cache";

// TODO perhaps show error but still update image if old file not found

export async function create(formData) {
	"use server";

	let file = formData.get("image");
	let entry = formData.get("entry");

	if (!entry) entry = "categories";

	let categoryId = formData.get("categories");
	let parentId = formData.get("parents");
	let childId = formData.get("children");
	let name = formData.get("name");

	let brand = formData.get("brand");
	let model = formData.get("model");
	let quantity = formData.get("quantity");
	let price = formData.get("price");

	let id = formData.get("id");
	let description = formData.get("description");

	let category = { name: undefined, val: undefined };
	let parent = { name: undefined, val: undefined };
	let child = { name: undefined, val: undefined };

	if (!id) {
		let idName = name.toLowerCase();
		let array = idName.split(/ and| &|, /);
		idName = array[0];
		idName = idName.replace(/\s/g, "-");
		formData.set("id", idName);
		id = formData.get("id");
	}

	if (childId !== null) {
		child = { name: "ChildId", val: childId };
	} else {
		child = { name: undefined, val: undefined };
	}
	if (parentId !== null) {
		parent = { name: "ParentId", val: parentId };
	} else {
		parent = { name: undefined, val: undefined };
	}
	if (categoryId !== null) {
		category = { name: "CategoryId", val: categoryId };
	} else {
		category = { name: undefined, val: undefined };
	}

	const writeToDb = async (dir = null) => {
		if (entry !== "items") {
			try {
				const res = await prisma[entry].create({
					data: {
						id: id,
						name: name,
						brand: brand ? brand : undefined,
						model: model ? model : undefined,
						quantity: quantity ? parseInt(quantity, 10) : undefined,
						price: price ? parseFloat(price) : undefined,
						description: description ? description : undefined,
						image: dir ? dir : undefined,
						[category.name]: category.val,
						[parent.name]: parent.val,
						[child.name]: child.val,
					},
				});
				return { success: "Item created!" };
			} catch (error) {
				return {
					error:
						"Error Creating Item: \n Please check your connection and try again.",
				};
			}
		} else {
			try {
				const res = await prisma[entry].create({
					data: {
						id: id,
						name: name,
						brand: brand ? brand : undefined,
						model: model ? model : undefined,
						quantity: quantity ? parseInt(quantity, 10) : undefined,
						price: price ? parseFloat(price) : undefined,
						description: description ? description : undefined,
						images: dir ? dir : undefined,
						[category.name]: category.val,
						[parent.name]: parent.val,
						[child.name]: child.val,
					},
				});
				return { success: "Item created successfully!" };
			} catch (error) {
				return {
					error:
						"Error Creating Item: \n Please check your connection and try again.",
				};
			}
		}
	};
	if (!file) {
		const query = await writeToDb();
		if (query?.error)
			return { error: `Error creating item: \n ${query.error}` };
		else {
			revalidatePath("/catalogue");
			revalidatePath("/dashboard");
			revalidateTag("search");
			return { success: `Created Successfully!` };
		}
	} else {
		let relativeUploadDir;
		if (entry !== "items") {
			relativeUploadDir = `/uploads/${entry}/${id}`;
		} else relativeUploadDir = `/uploads/${entry}/${category.val}/${id}`;

		const uploadDir = join(process.cwd(), "public", relativeUploadDir);

		try {
			const upload = await stat(uploadDir);
		} catch (e) {
			if (e.code === "ENOENT") {
				await mkdir(uploadDir, { recursive: true });
			} else {
				console.error(
					"Error while trying to create directory when uploading a file \n Please check your connection and try again."
				);
			}
		}

		if (entry !== "items") {
			const buffer = Buffer.from(await file.arrayBuffer());
			const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
			const filename = `${file.name.replace(
				/\.[^/.]+$/,
				""
			)}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
			const wtf = await writeFile(`${uploadDir}/${filename}`, buffer);

			if (wtf?.error) {
				return {
					error: `Error creating directory for file upload. Please check your connection and try again.`,
				};
			}
			let imageUrl = `${relativeUploadDir}/${filename}`;

			const query = await writeToDb(imageUrl);
			if (query?.error)
				return {
					error: `Error creating item \n Please check your connection and try again.`,
				};
			else {
				revalidatePath("/catalogue");
				revalidatePath("/dashboard");
				revalidateTag("search");
				return { success: `Created Successfully!` };
			}
		} else {
			const formDataEntryValues = Array.from(formData.values());
			let imageUrl = [];
			for (const formDataEntryValue of formDataEntryValues) {
				if (
					typeof formDataEntryValue === "object" &&
					"arrayBuffer" in formDataEntryValue
				) {
					const file = formDataEntryValue;
					const buffer = Buffer.from(await file.arrayBuffer());
					fs.writeFileSync(`${uploadDir}/${file.name}`, buffer);
					imageUrl.push(`${relativeUploadDir}/${file.name}`);
				}
			}
			const query = await writeToDb(imageUrl);
			if (query?.error) {
				console.log(query.error);
				return { error: `Error creating item ` };
			} else {
				revalidatePath("/catalogue");
				revalidatePath("/dashboard");
				revalidateTag("search");
				return { success: `Created Successfully!` };
			}
		}
	}
}

export async function update(formData) {
	"use server";

	let file = formData.get("newImage");
	let entry = formData.get("entry");

	if (!entry) entry = "categories";

	let categoryId = formData.get("CategoryId");
	let parentId = formData.get("ParentId");
	let childId = formData.get("ChildId");
	let name = formData.get("name");

	let brand = formData.get("brand");
	let model = formData.get("model");
	let quantity = formData.get("quantity");
	let price = formData.get("price");

	let id = formData.get("id");
	let newId = formData.get("newId");

	let description = formData.get("description");
	let image = formData.get("image");

	let category = { name: undefined, val: undefined };
	let updatedId = { name: undefined, val: undefined };

	if (newId && newId !== id) updatedId = { name: "id", val: newId };
	if (!id) {
		let idName = name.toLowerCase();
		let array = idName.split(/ and| &|, /);
		idName = array[0];
		idName = idName.replace(/\s/g, "-");
		formData.set("id", idName);
		id = formData.get("id");
	}

	if (childId !== null) {
		category = { name: "ChildId", val: childId };
	} else if (parentId !== null) {
		category = { name: "ParentId", val: parentId };
	} else if (categoryId !== null) {
		category = { name: "CategoryId", val: categoryId };
	}

	const writeToDb = async (dir = null) => {
		if (entry !== "items") {
			try {
				const res = await prisma[entry].update({
					where: { id: id },
					data: {
						[updatedId.name]: updatedId.val,
						name: name,
						brand: brand ? brand : undefined,
						model: model ? model : undefined,
						quantity: quantity ? parseInt(quantity, 10) : undefined,
						price: price ? parseFloat(price) : undefined,
						description: description ? description : undefined,
						image: dir ? dir : undefined,
						[category.name]: category.val,
					},
				});
				return { success: "Updated successfully!" };
			} catch (error) {
				return {
					error: `Error Updating Item. \n Please check your connection and try again.`,
				};
			}
		} else {
			try {
				const res = await prisma[entry].update({
					where: { id: id },
					data: {
						[updatedId.name]: updatedId.val,
						name: name,
						brand: brand ? brand : undefined,
						model: model ? model : undefined,
						quantity: quantity ? parseInt(quantity, 10) : undefined,
						price: price ? parseFloat(price) : undefined,
						description: description ? description : undefined,
						images: dir ? dir : undefined,
						[category.name]: category.val,
					},
				});
				return { success: "Updated successfully!" };
			} catch (error) {
				return {
					error: `Error Updating Item: \n Please check your connection and try again.`,
				};
			}
		}
	};

	if (!file) {
		const query = await writeToDb();
		if (query?.error)
			return {
				error: `Error Updating Item: \n Please check your connection and try again.`,
			};
		else {
			revalidatePath("/catalogue");
			revalidatePath("/dashboard");
			revalidateTag("search");
			return { success: `Updated Successfully!` };
		}
	} else if (typeof file === "string" && entry !== "items") {
		const query = await writeToDb(file);
		if (query?.error)
			return {
				error: `Error Updating Item: \n Please check your connection and try again.`,
			};
		else {
			revalidatePath("/catalogue");
			revalidatePath("/dashboard");
			revalidateTag("search");
			return { success: `Updated Successfully!` };
		}
	} else {
		let relativeUploadDir;
		if (entry !== "category") {
			relativeUploadDir = `/uploads/${entry}/${id}`;
		} else relativeUploadDir = `/uploads/${entry}/${category.val}/${id}`;

		const uploadDir = join(process.cwd(), "public", relativeUploadDir);

		const delDir = join(process.cwd(), "public");

		try {
			await stat(uploadDir);
		} catch (e) {
			if (e.code === "ENOENT") {
				await mkdir(uploadDir, { recursive: true });
			} else {
				return {
					error: `Error Updating Item. \n There seems to be a problem while creating image file.`,
				};
			}
		}

		try {
			if (entry !== "items") {
				const oldFile = formData.get("image");
				const buffer = Buffer.from(await file.arrayBuffer());
				const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

				const filename = `${file.name.replace(
					/\.[^/.]+$/,
					""
				)}-${uniqueSuffix}.${mime.getExtension(file.type)}`;

				// Delete existing file if any
				if (oldFile) {
					try {
						await unlink(`${delDir}/${oldFile}`);
					} catch (error) {
						return {
							error: `Problem while removing existing image/s \n Please check your connection and try again.`,
						};
					}
				}

				try {
					await writeFile(`${uploadDir}/${filename}`, buffer);
				} catch (error) {
					return {
						error: `Error creating image/s files \n Please check your connection and try again.`,
					};
				}

				let imageUrl = `${relativeUploadDir}/${filename}`;

				const query = await writeToDb(imageUrl);
				if (query?.error)
					return {
						error: `Error Updating Item \n Please check your connection and try again.`,
					};
				else {
					revalidatePath("/catalogue");
					revalidatePath("/dashboard");
					revalidateTag("search");
					return { success: `Updated Successfully!` };
				}
			} else {
				let oldFile = formData.get("images");
				if (oldFile && oldFile !== "null") {
					oldFile = oldFile.split(",");
					oldFile.map((oldImg) => unlink(`${delDir}/${oldImg}`));
					formData.delete("images");
				}
				const formDataEntryValues = Array.from(formData.values());
				let imageUrl = [];
				for (const formDataEntryValue of formDataEntryValues) {
					if (
						typeof formDataEntryValue === "object" &&
						"arrayBuffer" in formDataEntryValue
					) {
						const file = formDataEntryValue;
						const buffer = Buffer.from(await file.arrayBuffer());
						fs.writeFileSync(`${uploadDir}/${file.name}`, buffer);
						imageUrl.push(`${relativeUploadDir}/${file.name}`);
					}
				}
				const query = await writeToDb(imageUrl);
				if (query?.error)
					return {
						error: `Error Updating Item \n Please check your connection and try again.`,
					};
				else {
					revalidatePath("/catalogue");
					revalidatePath("/dashboard");
					revalidateTag("search");
					return { success: `Updated Successfully!` };
				}
			}
		} catch (e) {
			return {
				error: `Error Uploading File. \n Please check your connection and try again.`,
			};
		}
	}
}

export async function deleteItem(entry, data) {
	"use server";

	const removeFromDb = async () => {
		try {
			await prisma[entry].delete({
				where: {
					id: data.id,
				},
			});
			return { success: "Item Removed!" };
		} catch (error) {
			return {
				error: `Error Removing Item \n Make sure the item exists and try again.`,
			};
		}
	};

	const delDir = join(process.cwd(), "public");

	if (entry !== "items") {
		if (data.image) {
			try {
				unlink(`${delDir}/${data.image}`);
			} catch (e) {
				return {
					error: `Problem occured while removing image file. \n Please check your connection and try again.`,
				};
			}
			const query = await removeFromDb();
			if (query?.error) {
				return { error: query.error };
			} else {
				revalidateTag("search");
				revalidatePath("/catalogue");
				revalidatePath("/dashboard");
				return { success: query.success };
			}
		} else {
			const query = await removeFromDb();
			if (query?.error) {
				return { error: query.error };
			} else {
				revalidateTag("search");
				revalidatePath("/catalogue");
				revalidatePath("/dashboard");
				return { success: query.success };
			}
		}
	} else {
		let images = data.images;
		let dir = `${delDir}/uploads/${entry}/${data.ChildId}/${data.id}/`;

		if (images) {
			try {
				fs.rm(
					dir,
					{
						recursive: true,
						force: true,
					},
					(err) => {
						if (err) {
							return {
								error: `Error Removing Image File: \n Please check your connection and try again.`,
							};
						}
					}
				);
				const query = await removeFromDb();
				if (query?.error)
					return {
						error: `Error Removing Item. \n Please check your connection and try again.`,
					};
				else {
					revalidateTag("search");
					revalidatePath("/catalogue");
					revalidatePath("/dashboard");
					return { success: "Item Removed!" };
				}
			} catch (e) {
				const query = await removeFromDb();
				if (query?.error) {
					return {
						error: `Error Removing Item. \n Please check your connection and try again.`,
						e: `Problem with file removal \n ${e}`,
					};
				} else {
					revalidateTag("search");
					revalidatePath("/catalogue");
					revalidatePath("/dashboard");
					return {
						success: "Item Removed!",
						e: `Error Removing File: \n Please check your connection and try again.`,
					};
				}
			}
		} else {
			const query = await removeFromDb();
			if (query?.error)
				return {
					error: `Error Removing Item. \n Please check your connection and try again.`,
				};
			else {
				revalidateTag("search");
				revalidatePath("/catalogue");
				revalidatePath("/dashboard");
				return { success: "Item Removed!" };
			}
		}
	}
}
