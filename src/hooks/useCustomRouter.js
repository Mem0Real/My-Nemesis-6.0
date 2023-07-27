import { useRouter, useSearchParams } from "next/navigation";

// TODO have to decode multiple filters from url
const useCustomRouter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = {};

  let search = searchParams.get("search");
  let sort = searchParams.get("sort");
  let filter = searchParams.get("filter");
  let page = searchParams.get("page");

  if (search) query.search = search;

  if (sort) query.sort = sort;

  if (filter) {
    let decodedFilter = decodeURIComponent(filter);
    console.log(decodedFilter);
    query.filter = decodedFilter;
  }

  if (page) query.page = parseInt(page);

  const pushQuery = ({ search, sort, filter, page }) => {
    if (search !== undefined) {
      search === "" ? delete query.search : (query.search = search);
    }
    if (sort !== undefined) {
      sort === "" ? delete query.sort : (query.sort = sort);
    }

    if (filter?.length > 0) {
      filter === "" ? delete query.filter : (query.filter = filter);
    }

    if (page !== undefined) {
      page === 1 ? delete query.page : (query.page = page);
    }
    const newQuery = new URLSearchParams(query).toString();
    router.push(`?${newQuery}`);
  };
  return { pushQuery, query };
};

export default useCustomRouter;
