import Link from "next/link";
import { getOne } from "./searchActions";

export default function Items({ children }) {
  return (
    <div className="flex flex-col justify-evenly gap-6 items-center w-full">
      <p className="text-zinc-500 text-lg ">Products </p>

      {children[0].map(async (item) => {
        const childData = await getOne("children", item.ChildId);
        const parentData = await getOne("parents", childData.ParentId);
        const categoryData = await getOne("categories", parentData.CategoryId);

        return (
          <div
            key={item.id}
            className="flex flex-col justify-center items-center"
          >
            <ul className="list-disc">
              <Link
                href={`/collection/${categoryData.id}/${parentData.id}/${childData.id}/${item.id}`}
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
