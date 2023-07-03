import prisma from "@/lib/prisma";

export async function removeAll() {
  const query = prisma.children.deleteMany({});
  console.log(`Deleted all ${query.count} orders.`);
}

export async function markDelivered(id) {
  const data = prisma.children.update({
    where: {
      id: id,
    },
    data: {
      delivered: true,
    },
  });

  return data;
}
