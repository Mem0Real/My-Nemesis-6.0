import "./globals.css";

import { Suspense } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ProductDataContext from "@/context/productContext";
import { NextAuthProvider } from "../context/sessionContext";
import ToasterContext from "@/context/ToasterContext";
import { ThemeProvider } from "@/context/theme-provider";

import CartBase from "./cart/CartBase";
import SearchBase from "./search/SearchBase";
import CustomIcons from "./utils/CustomIcons";
import SideBarBase from "./sidebar/SideBarBase";

export const metadata = {
  title: "My Nemesis 6.0",
  description:
    "Full Stack page offering product market display based on ethio machineries",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }} className="dark">
      <body>
        <NextAuthProvider>
          <ProductDataContext>
            <ThemeProvider attribute="class">
              <CustomIcons>
                <ToasterContext />
                <div className="flex flex-col justify-between h-full overflow-x-hidden no-scrollbar overflow-y-auto overscroll-y-none bg-neutral-100 relative transition-all ease-in-out duration-300">
                  <CartBase>
                    <SearchBase>
                      <Navbar />
                    </SearchBase>
                  </CartBase>
                  <div className="relative">
                    <SideBarBase>
                      <Suspense>
                        <SideBarBase />
                      </Suspense>
                    </SideBarBase>
                  </div>
                  <div className={`min-h-screen`}>{children}</div>
                  <div className="w-full">
                    <Footer />
                  </div>
                </div>
              </CustomIcons>
            </ThemeProvider>
          </ProductDataContext>
        </NextAuthProvider>
      </body>
    </html>
  );
}
