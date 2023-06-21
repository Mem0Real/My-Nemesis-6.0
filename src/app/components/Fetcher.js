"use server";
import { list } from "../dashboard/actions";
import Search from "./Search";

export default async function Fetcher({ modal, closeSearch }) {
  const data = await list();
  return <Search data={data} modal={modal} closeSearch={closeSearch} />;
}
