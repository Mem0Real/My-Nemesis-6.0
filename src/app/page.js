import Link from "next/link";
import { ConfigProvider } from "antd";

import theme from "./components/theme/themeConfig";

export default async function Home() {
  return (
    <ConfigProvider theme={theme}>
      <main className="min-h-screen h-fit min-w-screen bg-neutral-100 text-neutral-900">
        <div className="flex flex-col items-center md:mt-12 gap-12">
          <h1 className="text-3xl font-bold underline underline-offset-8">
            My Nemesis
          </h1>
          <p>
            <Link href="/categories">Categories</Link>
          </p>
        </div>
      </main>
    </ConfigProvider>
  );
}
