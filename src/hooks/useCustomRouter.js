import { useRouter, useSearchParams } from "next/navigation";

const useCustomRouter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = {};

  let search = searchParams.get("search");
  let sort = searchParams.get("sort");
  let filter = searchParams.get("filter");

  if (search) query.search = search;

  if (sort) query.sort = sort;

  const pushQuery = ({ search, sort, filter }) => {
    if (search !== undefined) {
      search === "" ? delete query.search : (query.search = search);
    }
    if (sort !== undefined) {
      sort === "" ? delete query.sort : (query.sort = sort);
    }

    if (filter?.length > 0) {
      filter === "" ? delete query.filter : (query.filter = filter);
    }

    const newQuery = new URLSearchParams(query).toString();
    router.push(`?${newQuery}`);
  };
  return { pushQuery, query };
};

export default useCustomRouter;
