import Link from "next/link";

export default function Categories({ children }) {
  return (
    <div className="flex flex-col justify-evenly gap-6 items-center w-full">
      <p className="text-zinc-500 text-lg ">Main Categories </p>
      {children.map((category) => {
        return (
          <div
            key={category.id}
            className="flex flex-col justify-center items-center"
          >
            <ul className="list-disc">
              <Link href={`/collection/${category.id}`}>
                <li>{category.name}</li>
              </Link>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
