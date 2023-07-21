import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./globals.css";

import ProductDataContext from "@/context/productContext";
import { NextAuthProvider } from "../context/sessionContext";
import ToasterContext from "@/context/ToasterContext";
// import { ThemeProvider } from "@/context/themeContext";
// import { ThemeSwitcher } from "./components/ThemeSwitcher";
import Providers from "@/context/Providers";

import CartBase from "./cart/CartBase";
import SearchBase from "./search/SearchBase";
import CustomIcons from "./utils/CustomIcons";

export const metadata = {
  title: "My Nemesis 6.0",
  description:
    "Full Stack page offering product market display based on ethio machineries",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <ProductDataContext>
            <ToasterContext />
            <Providers>
              <div className="flex flex-col justify-between h-full overflow-x-hidden no-scrollbar overflow-y-auto overscroll-y-none bg-neutral-100 relative transition-all ease-in-out duration-300">
                <CustomIcons>
                  <CartBase>
                    <SearchBase>
                      <Navbar />
                    </SearchBase>
                  </CartBase>
                  <div className={`min-h-screen`}>{children}</div>
                  <div className="w-full">
                    <Footer />
                  </div>
                </CustomIcons>
              </div>
            </Providers>
          </ProductDataContext>
        </NextAuthProvider>
      </body>
    </html>
  );
}
