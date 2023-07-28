import Link from "next/link";

async function categoryList() {
  const categories = prisma.categories.findMany({ orderBy: { id: "asc" } });

  const parents = prisma.parents.findMany({ orderBy: { id: "asc" } });

  const children = prisma.children.findMany({ orderBy: { id: "asc" } });

  const items = prisma.items.findMany({ orderBy: { name: "asc" } });

  const data = await Promise.all([categories, parents, children, items]);

  return data;
}
async function copy(id, upId) {
  const res = await prisma.items.update({
    where: { id: id },
    data: { ParentId: upId },
  });
}

export default async function Home() {
  const [categories, parents, children, items] = await categoryList();
  const editor = () => {
    parents.map((parent) => {
      // console.log("Parents: ", parent.id, parent.CategoryId);
      children.map(({ id, ParentId, CategoryId }) => {
        if (ParentId === parent.id) console.log(id, parent.CategoryId);
      });
    });
  };

  const editor2 = () => {
    children.map((child) => {
      // console.log("Children: ", child.id, child.CategoryId);
      items.map(({ id, name, ChildId, CategoryId }) => {
        if (ChildId === child.id) copy(id, child.CategoryId);
      });
    });
  };

  const editor3 = () => {
    children.map((child) => {
      // console.log("Children: ", child.id, child.ParentId);
      items.map(({ id, name, ChildId }) => {
        if (ChildId === child.id) copy(id, child.ParentId);
      });
      // if (ParentId === parent.id) console.log(id, parent.CategoryId);
    });
  };
  editor3();
  return (
    <main className="min-h-screen h-fit min-w-screen bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 pt-6">
      <div className="flex flex-col items-center md:mt-12 gap-12">
        <h1 className="text-3xl font-bold underline underline-offset-8">
          My Nemesis
        </h1>
        <p>
          <Link href="/categories">Categories</Link>
        </p>
      </div>
    </main>
  );
}
