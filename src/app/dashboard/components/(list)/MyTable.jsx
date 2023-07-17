import React, { Suspense } from "react";
import { useDataContext } from "./List";
import CategoryRow from "./CategoryRow";

export default function MyTable() {
  const { data } = useDataContext();

  const categories = data[0];

  return (
    <main>
      <div className="table-container">
        <div className="uk-overflow-auto w-[96%] mx-auto">
          <table className="uk-table uk-table-hover uk-table-start uk-table-divider w-full">
            <thead className="border-b border-black">
              <tr className="">
                <th className="text-center md:text-start py-5">Name</th>
                <th className="text-center md:text-start py-5">Description</th>
                <th className="px-5" />
              </tr>
            </thead>
            <tbody>
              <Suspense
                fallback={
                  <h1 className="text-4xl text-black mx-auto">Loading...</h1>
                }
              >
                {categories.map((category, index) => (
                  <React.Fragment key={category.id}>
                    <CategoryRow category={category} index={index} />
                  </React.Fragment>
                ))}
              </Suspense>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
