import List from "./components/List";
import { list, create, update, deleteItem } from "./actions";

export default async function DashboardPage() {
  let url;
  if (process.env.NODE_ENV === "development") url = process.env.LOCAL_URL;
  else url = process.env.PRODUCTION_URL;

  const data = await list();
  return (
    <div className="flex flex-col w-full min-h-screen justify-center py-12 items-center gap-6">
      <List
        data={data}
        create={create}
        update={update}
        deleteItem={deleteItem}
        url={url}
      />
    </div>
  );
}
