import Link from "next/link";
import { useFunctionsContext } from "@/app/components/NavComponents";

export default function Items({ children }) {
  const { data, closeSearch } = useFunctionsContext();

  return (
    <div className="flex flex-col itmes-start gap-4 border-b border-neutral-200">
      <h1 className="text-start md:ms-3 text-lg font-semibold underline w-full">
        Products
      </h1>
      <div className="ms-5 border-l border-neutral-500 flex flex-col items-start gap-3">
        {children.map((item) => {
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
            <div key={item.id} className="ps-5">
              <Link
                href={`/collection/${category.id}/${parent.id}/${child.id}/${item.id}`}
              >
                <p onClick={closeSearch}>{item.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
