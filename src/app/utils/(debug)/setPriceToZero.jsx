import { prisma } from "@/lib/prisma";

export default async function setPriceToZero() {
  const items = await prisma.items.findMany({
    select: { id: true, price: true },
  });

  items.map(async ({ id, price }) => {
    if (!price) {
      const res = await prisma.items.update({
        where: { id: id },
        data: { price: 0 },
      });
    }
  });
}
