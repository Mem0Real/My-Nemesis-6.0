import useSWR from "swr";

export default function getData() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR("/api/getAll", fetcher);

  return { data, error, isLoading };
}
