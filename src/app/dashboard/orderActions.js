import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { toast } from "react-hot-toast";

export async function removeAll(entry) {
  "use server";

  const query = await prisma[entry].deleteMany({});
  if (query?.error) {
    return { error: `Error Removing Orders: ${query.error}` };
  } else {
    revalidatePath("/dashboard");
    return { success: `Deleted all ${query.count} ${entry}.` };
  }
}

export async function removeOne(entry, id) {
  "use server";
  const query = await prisma[entry].delete({
    where: {
      id: id,
    },
  });
  if (query?.error) {
    return { error: `Error Removing Order: ${query.error}` };
  } else {
    revalidatePath("/dashboard");
    return { success: `'${id}'\' Order Removed` };
  }
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
  if (data?.error) {
    return { error: ("Error Marking as Delivered: ", data.error) };
  } else {
    revalidatePath("/dashboard");
    return { success: `'${id}'\'s Order Set to Delivered` };
  }
}
