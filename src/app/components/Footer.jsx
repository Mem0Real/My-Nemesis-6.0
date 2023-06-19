export default function Footer() {
  return (
    <div className="navbar text-xl flex justify-between items-center bg-neutral-900 text-neutral-100 h-16">
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
