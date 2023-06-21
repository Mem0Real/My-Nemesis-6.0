export default async function fetchEntries(entry, data = null) {
  const res = await fetch("/api/getEntries", { next: { tags: ["getAll"] } });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
