import prisma from "@/prisma";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import * as dateFn from "date-fns";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

async function update(formData, { params: { id } }) {
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

  if (!brand) brand = undefined;
  if (!model) model = undefined;
  if (!quantity) {
    quantity = undefined;
  } else {
    quantity = parseInt(quantity, 10);
  }
  if (!price) {
    price = undefined;
  } else {
    price = parseFloat(price);
  }

  let description = formData.get("description");
  let image = formData.get("image");

  const writeToDb = async (dir) => {
    formData.set("image", dir);
    image = formData.get("image");

    try {
      const res = await prisma[entry].update({
        where: { id: id },
        data: {
          name: name,
          brand: brand,
          model: model,
          quantity: quantity,
          price: price,
          description: description,
          image: image,
        },
      });
      console.log("Success");
      redirect(`/dashboard`);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  if (!file) {
    await writeToDb("");
  } else {
    const buffer = Buffer.from(await file.arrayBuffer());

    let relativeUploadDir;
    if (process.env.NODE_ENV === "development") {
      relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`;
    } else {
      relativeUploadDir = `/tmp/${dateFn.format(Date.now(), "dd-MM-Y")}`;
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
    } catch (e) {
      console.error("Error while trying to upload a file\n", e);
    }
  }
}

const Edit = async ({ params: { id } }) => {
  return (
    <div>
      <form
        action={update}
        className="flex-1 flex flex-col justify-center items-center gap-12"
      >
        <input name="id" type="text" value={id} hidden />
        <input
          name="name"
          type="text"
          className="block py-2.5 px-0 w-1/2 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder="Name"
        />
        <textarea
          name="description"
          type="text"
          className="block py-2.5 px-0 w-1/2 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder="Description"
        />
        <input
          id="image"
          name="image"
          type="file"
          className="block py-2.5 px-0 w-1/2 text-sm text-neutral-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Edit;
