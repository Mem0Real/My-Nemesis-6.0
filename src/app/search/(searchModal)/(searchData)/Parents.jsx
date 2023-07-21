import Link from "next/link";
import { useSearchContext } from "../../SearchBase";

export default function Parents({ children }) {
  const { closeSearch } = useSearchContext();

  return (
    <div className="flex flex-col itmes-start gap-4">
      <h1 className="text-start ms-3 text-lg font-semibold underline w-full">
        Parents
      </h1>
      <div className="ms-5 border-l border-neutral-500 flex flex-col items-start gap-3">
        {children.map((parent) => {
          return (
            <div key={parent.id} className="ps-5">
              <Link href={`/collection/${parent.CategoryId}/${parent.id}`}>
                <p onClick={closeSearch}>{parent.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
