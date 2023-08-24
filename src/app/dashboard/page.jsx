import { Suspense } from "react";
import DataFetcher from "./DataFetcher";
import PageWrapper from "../components/PageWrapper";
import ParticleGenerator from "./components/ParticleGenerator";

export default async function DashboardPage() {
  return (
    <PageWrapper>
      <ParticleGenerator />
      <div className="flex flex-col items-center gap-6 bg-neutral-300 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 pb-5">
        <div className="flex items-center mt-7">
          <h1 className="text-3xl font-bold underline underline-offset-4 p-4">
            Admin
          </h1>
        </div>
        <Suspense
          fallback={
            <h1 className="text-3xl w-full flex flex-col items-center bg-neutral-300 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
              Loading...
            </h1>
          }
        >
          <DataFetcher />
        </Suspense>
      </div>
    </PageWrapper>
  );
}
