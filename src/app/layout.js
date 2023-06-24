import { Inter, Raleway } from "next/font/google";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Suspense } from "react";

import "./globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import LoadingIndicator from "./utils/LoadingIndicator";
config.autoAddCss = false;

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const raleway = Raleway({
  subsets: ["cyrillic"],
  display: "swap",
});
export const metadata = {
  title: "My Nemesis 6.0",
  description: "Full Stack page offering product market",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col justify-between h-full overflow-x-hidden no-scrollbar overflow-y-auto overscroll-y-none bg-neutral-100 relative">
          <span className={raleway.className}>
            <Navbar />
          </span>
          <Suspense fallback={<LoadingIndicator />}>
            <div className={`min-h-screen ${inter.className}`}>{children}</div>
          </Suspense>
          <div className="w-full">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
