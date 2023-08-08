import Header from "./components/Header";

export default async function Home() {
  return (
    <div className="relative min-h-screen h-[400%] w-full flex flex-col items-center">
      <Header />
    </div>
  );
}
