import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { toast } from "react-hot-toast";

export async function removeAll(entry) {
  "use server";

  const query = await prisma[entry].deleteMany({});
  if (query?.error) {
    return { error: `Error removing orders: ${query.error}` };
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
    return { error: `Error removing orders: ${query.error}` };
  } else {
    revalidatePath("/dashboard");
    return { success: `${entry} '${id}' removed successfully.` };
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
    return { error: ("Error removing orders: ", data.error) };
  } else {
    revalidatePath("/dashboard");
    return { success: `${entry} '${id}' set to delivered.` };
  }
}
