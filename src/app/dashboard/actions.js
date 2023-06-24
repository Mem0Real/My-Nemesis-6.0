import prisma from "@/prisma";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile, unlink } from "fs/promises";
import * as dateFn from "date-fns";

import { revalidatePath, revalidateTag } from "next/cache";

export async function list() {
  "use server";

  const categories = prisma.categories.findMany({});

  const parents = prisma.parents.findMany({});

  const children = prisma.children.findMany({});

  const items = prisma.items.findMany({});

  const data = await Promise.all([categories, parents, children, items]);

  return data;
}

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

  if (!brand) {
    if (entry !== "items") brand = undefined;
    else brand = name;
  }
  if (!model) {
    if (entry !== "items") model = undefined;
    else model = name;
  }
  if (!quantity) {
    if (entry !== "items") quantity = undefined;
    else quantity = 0;
  } else {
    quantity = parseInt(quantity, 10);
  }
  if (!price) {
    if (entry !== "items") price = undefined;
    else price = 0;
  } else {
    price = parseFloat(price);
  }

  let id = formData.get("id");
  let description = formData.get("description");
  let image = formData.get("image");

  let category = { name: undefined, val: undefined };

  const writeToDb = async (dir) => {
    formData.set("image", dir);
    image = formData.get("image");

    if (!id) {
      let idName = name.toLowerCase();
      let array = idName.split(/ and| &|, /);
      idName = array[0];
      idName = idName.replace(/\s/g, "-");
      formData.set("id", idName);
      id = formData.get("id");
    }

    if (!description) {
      formData.set("description", name);
      description = formData.get("description");
    }

    if (childId !== null) {
      category = { name: "ChildId", val: childId };
    } else if (parentId !== null) {
      category = { name: "ParentId", val: parentId };
    } else if (categoryId !== null) {
      category = { name: "CategoryId", val: categoryId };
    } else {
      category.name = undefined;
      category.val = undefined;
    }

    try {
      const res = await prisma[entry].create({
        data: {
          id: id,
          name: name,
          brand: brand,
          model: model,
          quantity: quantity,
          price: price,
          description: description,
          image: image,
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
  };
  if (!file) {
    await writeToDb("");
    revalidateTag("all");
    revalidateTag("search");
    revalidateTag("search");
  } else {
    const buffer = Buffer.from(await file.arrayBuffer());

    let relativeUploadDir;
    if (process.env.NODE_ENV === "development") {
      relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`;
    } else {
      relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`;
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
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${file.name.replace(
        /\.[^/.]+$/,
        ""
      )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);

      let imageUrl = `${relativeUploadDir}/${filename}`;

      await writeToDb(imageUrl);
      revalidateTag("all");
      revalidateTag("search");
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

  let categoryId = formData.get("categories");
  let parentId = formData.get("parents");
  let childId = formData.get("children");
  let name = formData.get("name");

  let brand = formData.get("brand");
  let model = formData.get("model");
  let quantity = formData.get("quantity");
  let price = formData.get("price");

  if (!brand) {
    if (entry !== "items") brand = undefined;
    else brand = name;
  }
  if (!model) {
    if (entry !== "items") model = undefined;
    else model = name;
  }
  if (!quantity) {
    quantity = undefined;
  } else {
    if (quantity === "null") quantity = 0;
    else quantity = parseInt(quantity, 10);
  }
  if (!price) {
    price = undefined;
  } else {
    if (price === "null") price = 0;
    else price = parseFloat(price);
  }

  let id = formData.get("id");
  let newId = formData.get("newId");

  let description = formData.get("description");
  let image = formData.get("image");

  let category = { name: undefined, val: undefined };
  let updatedId = { name: undefined, val: undefined };

  const writeToDb = async (dir) => {
    formData.set("image", dir);
    image = formData.get("image");

    if (newId && newId !== id) updatedId = { name: "id", val: newId };
    if (!id) {
      let idName = name.toLowerCase();
      let array = idName.split(/ and| &|, /);
      idName = array[0];
      idName = idName.replace(/\s/g, "-");
      formData.set("id", idName);
      id = formData.get("id");
    }

    if (!description) {
      formData.set("description", name);
      description = formData.get("description");
    }

    if (childId !== null) {
      category = { name: "ChildId", val: childId };
    } else if (parentId !== null) {
      category = { name: "ParentId", val: parentId };
    } else if (categoryId !== null) {
      category = { name: "CategoryId", val: categoryId };
    } else {
      category.name = undefined;
      category.val = undefined;
    }
    if (quantity === NaN) quantity = 0;
    if (price === NaN) price = 0;

    try {
      const res = await prisma[entry].update({
        where: { id: id },
        data: {
          [updatedId.name]: updatedId.val,
          name: name,
          brand: brand,
          model: model,
          quantity: quantity,
          price: price,
          description: description,
          image: image,
          [category.name]: category.val,
        },
      });
      revalidateTag("all");
      revalidateTag("search");
      revalidatePath("/dashboard");
      revalidatePath("/collection");
      console.log("Success");
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  if (!file) {
    await writeToDb("");
    revalidateTag("all");
    revalidateTag("search");
  } else if (typeof file === "string") {
    writeToDb(file);
    revalidateTag("all");
    revalidateTag("search");
  } else {
    const oldFile = formData.get("image");
    const buffer = Buffer.from(await file.arrayBuffer());

    let relativeUploadDir;
    if (process.env.NODE_ENV === "development") {
      relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`;
    } else {
      relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`;
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
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${file.name.replace(
        /\.[^/.]+$/,
        ""
      )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);

      console.log(oldFile);
      if (oldFile && oldFile !== null) await unlink(`${delDir}/${oldFile}`);

      let imageUrl = `${relativeUploadDir}/${filename}`;

      await writeToDb(imageUrl);
      revalidateTag("all");
      revalidateTag("search");
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

  if (data.image) unlink(`${delDir}/${data.image}`);

  revalidateTag("all");
  revalidateTag("search");
  return res;
}
