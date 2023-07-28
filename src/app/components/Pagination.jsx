export default function Pagination({ pageSize, currentPage, onPageChange }) {
  const pagesCount = Math.ceil(items / pageSize);

  // console.log(items);
  if (pagesCount === 1) return null;

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  // console.log(pages);

  return <h1 className="text-base">Pagination</h1>;
}
