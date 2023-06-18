import List from "./components/List";
import { create } from "./actions";

export default async function DashboardPage() {
  // async function create(formData) {
  //   "use server";

  //   let file = formData.get("image");
  //   let entry = formData.get("entry");

  //   if (!entry) entry = "categories";

  //   let categoryId = formData.get("categories");
  //   let parentId = formData.get("parents");
  //   let childId = formData.get("children");
  //   let name = formData.get("name");

  //   let brand = formData.get("brand");
  //   let model = formData.get("model");
  //   let quantity = formData.get("quantity");
  //   let price = formData.get("price");

  //   if (!brand) brand = undefined;
  //   if (!model) model = undefined;
  //   if (!quantity) {
  //     quantity = undefined;
  //   } else {
  //     quantity = parseInt(quantity, 10);
  //   }
  //   if (!price) {
  //     price = undefined;
  //   } else {
  //     price = parseFloat(price);
  //   }

  //   let id = formData.get("id");
  //   let description = formData.get("description");
  //   let image = formData.get("image");

  //   const writeToDb = async (dir) => {
  //     formData.set("image", dir);
  //     image = formData.get("image");

  //     if (!id) {
  //       let idName = name.toLowerCase();
  //       let array = idName.split(/ and| &|, /);
  //       idName = array[0];
  //       idName = idName.replace(/\s/g, "-");
  //       formData.set("id", idName);
  //       id = formData.get("id");
  //     }

  //     if (!description) {
  //       formData.set("description", name);
  //       description = formData.get("description");
  //     }

  //     try {
  //       const res = await prisma[entry].create({
  //         data: {
  //           id: id,
  //           name: name,
  //           brand: brand,
  //           model: model,
  //           quantity: quantity,
  //           price: price,
  //           description: description,
  //           image: image,
  //         },
  //       });
  //       console.log("Success");
  //     } catch (error) {
  //       console.log("Error: ", error);
  //     }
  //   };
  //   if (!file) {
  //     await writeToDb("");
  //   } else {
  //     const buffer = Buffer.from(await file.arrayBuffer());

  //     let relativeUploadDir;
  //     if (process.env.NODE_ENV === "development") {
  //       relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`;
  //     } else {
  //       relativeUploadDir = `/tmp/${dateFn.format(Date.now(), "dd-MM-Y")}`;
  //     }

  //     const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  //     try {
  //       await stat(uploadDir);
  //     } catch (e) {
  //       if (e.code === "ENOENT") {
  //         await mkdir(uploadDir, { recursive: true });
  //       } else {
  //         console.error(
  //           "Error while trying to create directory when uploading a file\n",
  //           e
  //         );
  //       }
  //     }

  //     try {
  //       const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  //       const filename = `${file.name.replace(
  //         /\.[^/.]+$/,
  //         ""
  //       )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
  //       await writeFile(`${uploadDir}/${filename}`, buffer);

  //       let imageUrl = `${relativeUploadDir}/${filename}`;

  //       await writeToDb(imageUrl);
  //       revalidateTag("all");
  //     } catch (e) {
  //       console.error("Error while trying to upload a file\n", e);
  //     }
  //   }
  // }

  let url;
  if (process.env.NODE_ENV === "development") url = process.env.LOCAL_URL;
  else url = process.env.PRODUCTION_URL;

  const res = await fetch("http://localhost:3000/api/getAll", {
    next: { tags: ["all"], revalidate: 0 },
  });

  const data = await res.json();
  return (
    <div className="flex flex-col w-full min-h-screen justify-center py-12 items-center gap-6">
      {<List data={data} create={create} />}
    </div>
  );
}
