import { Suspense } from "react";
import Link from "next/link";
import LoadingIndicator from "./utils/LoadingIndicator";

export default async function Home() {
  return (
    <main className="min-h-screen h-fit min-w-screen bg-neutral-100 text-neutral-900">
      <div className="flex flex-col items-center md:mt-12 gap-12">
        <h1 className="text-3xl font-bold underline underline-offset-8">
          My Nemesis
        </h1>
        <p>
          <Link href="/categories">Categories</Link>
        </p>
      </div>
    </main>
  );
}
