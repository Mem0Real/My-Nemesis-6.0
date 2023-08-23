import Skeleton from "@/app/components/Skeleton";

export default function ItemDetailLoader() {
  return (
    <div className="w-screen bg-neutral-100 dark:bg-neutral-800">
      <div className="flex gap-7 flex-wrap lg:flex-nowrap w-full justify-center sm:justify-normal mx-auto py-20 md:py-24 lg:py-28">
        <div className="flex flex-col sm:flex-row sm:items-center flex-wrap w-full gap-12">
          <div className="flex-initial flex-wrap flex sm:flex-col gap-6 sm:gap-12 justify-center sm:justify-normal w-fit -ms-4 border-b-4 sm:border-l-4 border-1 shadow-inner shadow-black order-2 sm:order-1">
            <Skeleton className="h-44 w-12 ms-1 bg-neutral-200 dark:bg-neutral-800 rounded-sm cursor-pointer hover:outline outline-1 outline-neutral-700 dark:outline-neutral-500" />
          </div>
          <div className="relative h-56 w-full sm:w-auto grow order-1 sm:order-2 sm:mr-12">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
        <div className="w-[43em] justify-center sm:justify-normal mx-auto items-center">
          <Skeleton className="h-12 w-1/2 mr-auto mb-2" />
          <div className="flex flex-col items-start ps-5 gap-7 py-6 w-full lg:w-[90%] bg-neutral-200 dark:bg-neutral-800 border border-neutral-800 dark:border-neutral-200 text-neutral-800 dark:text-neutral-200 rounded-xl drop-shadow-2xl ">
            <div className="flex items-center justify-evenly">
              <Skeleton className="w-40 h-4" />
              <Skeleton className="w-52 h-4" />
            </div>
            <div className="flex items-center justify-evenly">
              <Skeleton className="w-40 h-4" />
              <Skeleton className="w-52 h-4" />
            </div>
            <div className="flex items-center justify-evenly">
              <Skeleton className="w-40 h-4" />
              <Skeleton className="w-52 h-4" />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Skeleton className="w-40 h-4" />
              <Skeleton className="w-[370px] h-56" />
            </div>
            <div className="flex items-center justify-evenly">
              <Skeleton className="w-40 h-4" />
              <Skeleton className="w-52 h-4" />
            </div>
            <div className="flex items-center justify-evenly">
              <Skeleton className="w-40 h-4" />
              <Skeleton className="w-52 h-4" />
            </div>
            <div className="flex items-center justify-center mt-5 w-full mx-auto">
              <Skeleton className="w-36 h-8 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
