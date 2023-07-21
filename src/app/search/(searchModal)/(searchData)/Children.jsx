import Link from "next/link";
import { useSearchDataContext } from "../SearchModal";
import { useSearchContext } from "../../SearchBase";

export default function Children({ children }) {
  const { closeSearch } = useSearchContext();
  const { data } = useSearchDataContext();

  return (
    <div className="flex flex-col itmes-start gap-4">
      <h1 className="text-start ms-3 text-lg font-semibold underline w-full">
        Children
      </h1>
      <div className="ms-5 border-l border-neutral-500 flex flex-col items-start gap-3">
        {children.map((child) => {
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
            <div key={child.id} className="ps-5">
              <Link
                href={`/collection/${category.id}/${parent.id}/${child.id}`}
              >
                <p onClick={closeSearch}>{child.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
