import Image from "next/image";
import Link from "next/link";

export async function ParentData({ categoryId }) {
  let url;
  if (process.env.NODE_ENV === "development")
    url = process.env.NEXT_PUBLIC_LOCAL_URL;
  else if (process.env.NODE_ENV === "production")
    url = process.env.NEXT_PUBLIC_PRODUCTION_URL;
  const res = await fetch(`${url}/api/getData?entry=parents`);

  let parentsData = await res.json();

  // Sort by name
  let parents;
  parents = parentsData.sort((a, b) => {
    const name1 = a.name.toUpperCase();
    const name2 = b.name.toUpperCase();

    if (name1 < name2) return -1;
    else if (name1 > name2) return 1;
    else return 0;
  });

  return parents.map((parent) => {
    return (
      parent.CategoryId === categoryId && (
        <Link key={parent.id} href={`/collection/${categoryId}/${parent.id}`}>
          <div className="flex flex-col items-center group md:my-5">
            <div className="w-56 h-44 border border-black rounded-t-3xl shadow-inner shadow-neutral-950 hover:shadow-neutral-700 transition-all ease-in-out">
              {parent.image && (
                <Image src={parent.image} alt={parent.id} fill />
              )}
            </div>
            <div className="h-12 flex flex-col items-start ps-4 pt-3 rounded-b-2xl w-full bg-neutral-800 text-neutral-200 shadow-xl shadow-neutral-950 transition-all ease-in-out duration-500 group-hover:shadow-neutral-700 ">
              <h1>{parent.name}</h1>
            </div>
          </div>
        </Link>
      )
    );
  });
}
