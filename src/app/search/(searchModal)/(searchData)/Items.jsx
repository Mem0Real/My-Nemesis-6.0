import Link from "next/link";
import { useFunctionsContext } from "@/app/components/NavComponents";

export default function Items({ fourthArray }) {
  const { getOne } = useFunctionsContext();

  return (
    <div className="flex flex-col itmes-start gap-4 border-b border-neutral-200">
      <h1 className="text-start md:ms-3 text-lg font-semibold underline w-full">
        Products
      </h1>
      <div className="ms-5 border-l border-neutral-500 flex flex-col items-start gap-3">
        {fourthArray.map(async (item) => {
          const childData = await getOne("children", item.ChildId);
          const parentData = await getOne("parents", childData.ParentId);
          const categoryData = await getOne(
            "categories",
            parentData.CategoryId
          );

          return (
            <div key={item.id} className="ps-5">
              <Link
                href={`/collection/${categoryData.id}/${parentData.id}/${childData.id}/${item.id}`}
              >
                <p>{item.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
