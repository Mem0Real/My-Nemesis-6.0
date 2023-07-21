import Link from "next/link";
import { useSearchContext } from "../../SearchBase";

export default function Categories({ children }) {
  const { closeSearch } = useSearchContext();
  return (
    <div className="flex flex-col itmes-start gap-4">
      <h1 className="text-start ms-3 text-lg font-semibold underline w-full">
        Categories
      </h1>
      <div className="ms-5 border-l border-neutral-500 flex flex-col items-start gap-3">
        {children[0].map((category) => {
          return (
            <div key={category.id} className="ps-5">
              <Link href={`/collection/${category.id}`}>
                <p onClick={closeSearch}>{category.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
