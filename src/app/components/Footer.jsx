export default function Footer() {
  return (
    <div
      className="h-16 text-xl flex justify-between items-center bg-neutral-300 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 shadow-inner 
    shadow-neutral-500"
    >
      <div className="ms-4">
        <p>Nemesis</p>
      </div>
      <div className="me-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>Web developed by:</p>
          <p className="px-6">Mem0Real</p>
        </div>
      </div>
    </div>
  );
}
