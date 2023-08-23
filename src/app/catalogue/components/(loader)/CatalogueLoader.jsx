import Skeleton from "@/app/components/Skeleton";

export default function CatalogueLoader() {
  return (
    <div className="flex flex-col items-center gap-8 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 min-h-screen z-10 pt-24">
      <div className="w-full flex flex-col items-center justify-center pb-12 mb-2 shadow-xl shadow-blue-600/20 dark:shadow-blue-400/10 text-neutral-800 dark:text-neutral-200 backdrop-blur-sm bg-neutral-200/40 dark:bg-neutral-800/40">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight italic">
          Catalogue
        </h1>
      </div>
      <div className="w-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 my-12 ">
        <div className="mt-6 mx-auto w-[95%] h-screen relative rounded-xl border border-white/10 flex flex-col justify-start pt-12 gap-16 items-center shadow-inner shadow-black/40 backdrop-blur-sm">
          <Skeleton className="w-[15ch] h-[2rem]" />
          <div className="flex gap-6 justify-evenly w-full">
            <div className="flex flex-col justify-center items-center">
              <div className="border border-neutral-400 border-b-0 rounded-t-2xl drop-shadow-xl overflow-hidden">
                <Skeleton className="w-[286px] h-56 mx-auto" />
              </div>
              <div className="w-72 border border-neutral-400 rounded-b-2xl text-center text-sm py-5 hover:underline underline-offset-2">
                <Skeleton className="w-48 h-8 mx-auto" />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="border border-neutral-400 border-b-0 rounded-t-2xl drop-shadow-xl overflow-hidden">
                <Skeleton className="w-[286px] h-56 mx-auto" />
              </div>
              <div className="w-72 border border-neutral-400 rounded-b-2xl text-center text-sm py-5 hover:underline underline-offset-2">
                <Skeleton className="w-48 h-8 mx-auto" />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="border border-neutral-400 border-b-0 rounded-t-2xl drop-shadow-xl overflow-hidden">
                <Skeleton className="w-[286px] h-56 mx-auto" />
              </div>
              <div className="w-72 border border-neutral-400 rounded-b-2xl text-center text-sm py-5 hover:underline underline-offset-2">
                <Skeleton className="w-48 h-8 mx-auto" />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="border border-neutral-400 border-b-0 rounded-t-2xl drop-shadow-xl overflow-hidden">
                <Skeleton className="w-[286px] h-56 mx-auto" />
              </div>
              <div className="w-72 border border-neutral-400 rounded-b-2xl text-center text-sm py-5 hover:underline underline-offset-2">
                <Skeleton className="w-48 h-8 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
