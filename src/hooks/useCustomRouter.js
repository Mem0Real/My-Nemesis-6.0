import { useRouter, useSearchParams } from "next/navigation";

const useCustomRouter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = {};

  let search = searchParams.get("search");
  let sort = searchParams.get("sort");

  if (search) query.search = search;

  if (sort) query.sort = sort;

  const pushQuery = ({ search, sort }) => {
    if (search !== undefined) {
      search === "" ? delete query.search : (query.search = search);
    }
    if (sort !== undefined) {
      sort === "" ? delete query.sort : (query.sort = sort);
    }

    const newQuery = new URLSearchParams(query).toString();
    router.push(`?${newQuery}`);
  };
  return { pushQuery, query };
};

export default useCustomRouter;
