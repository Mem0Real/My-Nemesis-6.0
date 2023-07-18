import { Suspense } from "react";
import DataFetcher from "./dataFetcher";

export default async function DashboardPage() {
  return (
    <div className="flex flex-col items-center gap-6 bg-neutral-300 text-neutral-800 pb-5">
      <div className="flex items-center mt-7">
        <h1 className="text-3xl font-bold underline underline-offset-4 p-4">
          Admin
        </h1>
      </div>
      <Suspense
        fallback={
          <h1 className="text-3xl w-full min-h-screen flex flex-col items-center text-neutral-800">
            Loading...
          </h1>
        }
      >
        <DataFetcher />
      </Suspense>
    </div>
  );
}
