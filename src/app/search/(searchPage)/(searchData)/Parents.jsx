import { getOne } from "./searchActions";
import Link from "next/link";

export default async function Parents({ children }) {
  return (
    <div className="flex flex-col justify-evenly gap-6 items-center w-full">
      <p className="text-zinc-500 text-lg ">Parent Categories </p>

      {children.map(async (parent) => {
        const category = await getOne("categories", parent.CategoryId);
        return (
          <div
            key={parent.id}
            className="flex flex-col justify-center items-center"
          >
            <ul className="list-disc">
              <Link href={`/collection/${category.id}/${parent.id}`}>
                <li>{parent.name}</li>
              </Link>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
