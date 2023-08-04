import Link from "next/link";

export default function Items({ data, children }) {
  return (
    <div className="flex flex-col justify-evenly gap-6 items-center w-full">
      <p className="text-zinc-500 text-lg ">Products </p>

      {children[0].map(async (item) => {
        let category, parent, child;
        data[2].map((chi) => {
          if (chi.id === item.ChildId) {
            child = chi;
            data[1].map((par) => {
              if (par.id === child.ParentId) {
                parent = par;
                data[0].map((cat) => {
                  if (cat.id === parent.CategoryId) {
                    category = cat;
                  }
                });
              }
            });
          }
        });
        return (
          <div
            key={item.id}
            className="flex flex-col justify-center items-center"
          >
            <ul className="list-disc">
              <Link
                href={`/catalogue/${category.id}/${parent.id}/${child.id}/${item.id}`}
              >
                <li>{item.name}</li>
              </Link>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
