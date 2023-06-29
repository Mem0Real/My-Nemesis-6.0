import prisma from "@/lib/prisma";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile, unlink } from "fs/promises";
import fs from "fs";
import * as dateFn from "date-fns";

import { revalidatePath, revalidateTag } from "next/cache";

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
  let image = formData.get("image");

  let category = { name: undefined, val: undefined };

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
      formData.set("image", dir);
      image = formData.get("image");

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
            image: image ? image : undefined,
            [category.name]: category.val,
          },
        });
        revalidatePath("/collection");
        revalidatePath("/dashboard");
        revalidateTag("search");
        console.log("Success");
      } catch (error) {
        console.log("Error: ", error);
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
          },
        });
        revalidatePath("/collection");
        revalidatePath("/dashboard");
        revalidateTag("search");
        console.log("Success");
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };
  if (!file) {
    await writeToDb();
    revalidateTag("search");
    revalidatePath("/collection");
    revalidatePath("/dashboard");
  } else {
    let relativeUploadDir;
    if (process.env.NODE_ENV === "development") {
      if (entry !== "items") {
        relativeUploadDir = `/uploads/${entry}/${category.val}`;
      } else relativeUploadDir = `/uploads/${entry}/${category.val}/${id}`;
    } else {
      if (entry !== "items") {
        relativeUploadDir = `/uploads/${entry}/${category.val}`;
      } else relativeUploadDir = `/uploads/${entry}/${category.val}/${id}`;
    }

    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    try {
      await stat(uploadDir);
    } catch (e) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(
          "Error while trying to create directory when uploading a file\n",
          e
        );
      }
    }

    try {
      if (entry !== "items") {
        const buffer = Buffer.from(await file.arrayBuffer());
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${file.name.replace(
          /\.[^/.]+$/,
          ""
        )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
        await writeFile(`${uploadDir}/${filename}`, buffer);

        let imageUrl = `${relativeUploadDir}/${filename}`;

        await writeToDb(imageUrl);
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
        await writeToDb(imageUrl);
      }

      revalidateTag("search");
      revalidatePath("/dashboard");
      revalidatePath("/collection");
    } catch (e) {
      console.error("Error while trying to upload a file\n", e);
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
      formData.set("image", dir);
      image = formData.get("image");

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
            image: image ? image : undefined,
            [category.name]: category.val,
          },
        });
        revalidateTag("search");
        revalidatePath("/dashboard");
        revalidatePath("/collection");
        console.log("Success");
      } catch (error) {
        console.log("Error: ", error);
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
        revalidateTag("search");
        revalidatePath("/dashboard");
        revalidatePath("/collection");
        console.log("Success");
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };
  if (!file) {
    await writeToDb();
    console.log("No image");
    revalidateTag("search");
    revalidatePath("/dashboard");
    revalidatePath("/collection");
  } else if (typeof file === "string" && entry !== "items") {
    writeToDb(file);
    console.log("No change");
    revalidateTag("search");
    revalidatePath("/dashboard");
    revalidatePath("/collection");
  } else {
    let relativeUploadDir;
    if (process.env.NODE_ENV === "development") {
      if (entry !== "items") {
        relativeUploadDir = `/uploads/${entry}/${category.val}`;
      } else relativeUploadDir = `/uploads/${entry}/${category.val}/${id}`;
    } else {
      if (entry !== "items") {
        relativeUploadDir = `/uploads/${entry}/${category.val}`;
      } else relativeUploadDir = `/uploads/${entry}/${category.val}/${id}`;
    }

    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    const delDir = join(process.cwd(), "public");

    try {
      await stat(uploadDir);
    } catch (e) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(
          "Error while trying to create directory when uploading a file\n",
          e
        );
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
        if (oldFile && oldFile !== "null") {
          await unlink(`${delDir}/${oldFile}`);
        }

        await writeFile(`${uploadDir}/${filename}`, buffer);

        let imageUrl = `${relativeUploadDir}/${filename}`;

        await writeToDb(imageUrl);
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
        await writeToDb(imageUrl);
      }

      revalidateTag("search");
      revalidatePath("/dashboard");
      revalidatePath("/collection");
    } catch (e) {
      console.error("Error while trying to upload a file\n", e);
    }
  }
}

export async function deleteItem(entry, data) {
  "use server";

  const res = prisma[entry].delete({
    where: {
      id: data.id,
    },
  });
  const delDir = join(process.cwd(), "public");

  if (entry !== "items") {
    if (data.image) unlink(`${delDir}/${data.image}`);
  } else {
    let images = data.images;
    if (images) {
      images.map((file) => unlink(`${delDir}/${file}`));
    }
  }

  revalidateTag("search");
  revalidatePath("/dashboard");
  revalidatePath("/collection");
  return res;
}
