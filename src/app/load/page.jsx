"use client";

import Loading from "./component/Loading";

export default function CatalogueSkeleton() {
  return (
    <div className="h-screen bg-neutral-200 dark:bg-neutral-800 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-black">Hello</h1>
      <Loading />
    </div>
  );
}
