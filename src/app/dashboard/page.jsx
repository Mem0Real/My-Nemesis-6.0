import List from "./components/List";
import { create, list } from "./actions";

export default async function DashboardPage() {
  let url;
  if (process.env.NODE_ENV === "development") url = process.env.LOCAL_URL;
  else url = process.env.PRODUCTION_URL;

  // const res = await fetch("http://localhost:3000/api/getAll", {
  //   next: { tags: ["all"], revalidate: 0 },
  // });

  const data = await list();
  return (
    <div className="flex flex-col w-full min-h-screen justify-center py-12 items-center gap-6">
      <List data={data} create={create} url={url} />
    </div>
  );
}
