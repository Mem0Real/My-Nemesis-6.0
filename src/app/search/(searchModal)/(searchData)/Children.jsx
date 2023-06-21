import Link from "next/link";
import { useFunctionsContext } from "@/app/components/NavComponents";

export default function Children({ thirdArray }) {
  const { getOne } = useFunctionsContext();

  return (
    <div className="flex flex-col itmes-start gap-4 border-b border-neutral-200">
      <h1 className="text-start md:ms-3 text-lg font-semibold underline w-full">
        Children
      </h1>
      <div className="ms-5 border-l border-neutral-500 flex flex-col items-start gap-3">
        {thirdArray.map(async (child) => {
          const parentData = await getOne("parents", child.ParentId);

          const categoryData = await getOne(
            "categories",
            parentData.CategoryId
          );
          return (
            <div key={child.id} className="ps-5">
              <Link
                href={`/collection/${categoryData.id}/${parentData.id}/${child.id}`}
              >
                <p>{child.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
