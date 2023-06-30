async function removeImages() {
  const res = await prisma.categories.findMany({
    select: { id: true, image: true },
  });
  res.map(
    async (data) =>
      await prisma.children.update({
        where: { id: data.id },
        data: { image: null },
      })
  );
  const res2 = await prisma.children.findMany({
    select: { id: true, image: true },
  });
  console.log(res2);
}
removeImages();
