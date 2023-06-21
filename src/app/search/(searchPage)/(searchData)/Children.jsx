import Link from "next/link";
import { getOne } from "./searchActions";

export default function Children({ children }) {
  return (
    <div className="flex flex-col justify-evenly gap-6 items-center w-full">
      <p className="text-zinc-500 text-lg ">Child Categories </p>

      {children.map(async (child) => {
        const parentData = await getOne("parents", child.ParentId);

        const categoryData = await getOne("categories", parentData.CategoryId);
        return (
          <div
            key={child.id}
            className="flex flex-col justify-center items-center"
          >
            <ul className="list-disc">
              <Link
                href={`/collection/${categoryData.id}/${parentData.id}/${child.id}`}
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
