import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function removeAll(entry) {
  "use server";

  const query = await prisma[entry].deleteMany({});
  console.log(`Deleted all ${query.count} ${entry}.`);
  revalidatePath("/dashboard");
}

export async function removeOne(entry, id) {
  "use server";
  const query = await prisma[entry].delete({
    where: {
      id: id,
    },
  });
  console.log(`${entry} '${id}' removed successfully.`);
  revalidatePath("/dashboard");
}

export async function markDelivered(entry, id) {
  "use server";
  const data = await prisma[entry].update({
    where: {
      id: id,
    },
    data: {
      delivered: true,
    },
  });

  console.log(`${entry} '${id}' set to delivered.`);
  revalidatePath("/dashboard");
  return data;
}
