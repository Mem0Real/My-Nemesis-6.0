import Link from "next/link";

export default function Children({ data, children }) {
  return (
    <div className="flex flex-col justify-evenly gap-6 items-center w-full">
      <p className="text-zinc-500 text-lg ">Child Categories </p>

      {children.map(async (child) => {
        let category, parent;
        data[1].map((par) => {
          if (par.id === child.ParentId) {
            parent = par;
            data[0].map((cat) => {
              if (cat.id === par.CategoryId) {
                category = cat;
              }
            });
          }
        });
        return (
          <div
            key={child.id}
            className="flex flex-col justify-center items-center"
          >
            <ul className="list-disc">
              <Link
                href={`/collection/${category.id}/${parent.id}/${child.id}`}
              >
                <li>{child.name}</li>
              </Link>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
