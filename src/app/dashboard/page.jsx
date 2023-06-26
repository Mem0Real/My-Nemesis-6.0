import { list, create, update, deleteItem } from "./actions";
import AdminActions from "./AdminActions";

export default async function DashboardPage() {
  let url;
  if (process.env.NODE_ENV === "development") url = process.env.LOCAL_URL;
  else url = process.env.PRODUCTION_URL;

  const data = await list();
  return (
    <div className="flex flex-col items-center gap-6 bg-neutral-200 text-neutral-800">
      <div className="flex items-center mt-7">
        <h1 className="text-4xl font-bold underline underline-offset-4 p-4">
          Admin
        </h1>
      </div>

      <AdminActions
        data={data}
        create={create}
        update={update}
        deleteItem={deleteItem}
        url={url}
      />
    </div>
  );
}
