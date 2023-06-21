"use client";

import Link from "next/link";
import useSWR from "swr";

async function getOne(entry, id) {
  const fetcher = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: "application/json",
      body: JSON.stringify(entry, id),
      next: { cache: "no-store" },
    }).then((res) => res.json());
  const { data, isLoading, error } = useSWR("/api/getOne", fetcher);

  return { data, isLoading, error };
}
export default async function Parents({ children }) {
  return (
    <div className="flex flex-col itmes-start gap-4 border-b border-neutral-200">
      <h1 className="text-start md:ms-3 text-lg font-semibold underline w-full">
        Parents
      </h1>
      <div className="ms-5 border-l border-neutral-500 flex flex-col items-start gap-3">
        {children[0].map(async (parent) => {
          {
            /* const category = await getOne("categories", parent.CategoryId); */
          }
          return (
            <div key={parent.id} className="ps-5">
              <Link href={`/collection/${parent.CategoryId}/${parent.id}`}>
                <p>{parent.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
