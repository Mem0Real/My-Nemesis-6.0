import prisma from "@/lib/prisma";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile, unlink } from "fs/promises";
import fs from "fs";

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
        console.log("Success");
      } catch (error) {
        console.log("Error: ", error);
        throw new Error(`Error creating item: ${error}`);
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
        console.log("Success");
      } catch (error) {
        console.log("Error: ", error);
        throw new Error(`Error creating item: ${error}`);
      }
    }
    revalidatePath("/collection");
    revalidatePath("/dashboard");
    revalidateTag("search");
  };
  if (!file) {
    await writeToDb();
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

        console.log("Success");
      } catch (error) {
        console.log("Error: ", error);
        throw new Error(`Error updating item. ${error}`);
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

        console.log("Success");
      } catch (error) {
        console.log("Error: ", error);
        throw new Error(`Error updating item. ${error}`);
      }
    }

    revalidateTag("search");
    revalidatePath("/collection");
    revalidatePath("/dashboard");
  };
  if (!file) {
    await writeToDb();
    console.log("No image");
  } else if (typeof file === "string" && entry !== "items") {
    writeToDb(file);
    console.log("No change");
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
        if (oldFile) {
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
    if (data.image) {
      unlink(`${delDir}/${data.image}`);
    }
  } else {
    let images = data.images;
    let dir = `${delDir}/uploads/${entry}/${data.ChildId}/${data.id}/`;

    if (images) {
      fs.rm(
        dir,
        {
          recursive: true,
          force: true,
        },
        (err) => {
          if (err) {
            throw err;
          }

          console.log(`${dir} is deleted!`);
        }
      );
    }
  }

  revalidateTag("search");
  revalidatePath("/collection");
  revalidatePath("/dashboard");
  return res;
}
