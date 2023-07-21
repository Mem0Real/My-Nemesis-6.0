import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./globals.css";
import ProductDataContext from "@/context/productContext";
import { NextAuthProvider } from "./providers";
import ToasterContext from "@/context/ToasterContext";
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
            <div className="flex flex-col justify-between h-full overflow-x-hidden no-scrollbar overflow-y-auto overscroll-y-none bg-neutral-100 relative">
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
          </ProductDataContext>
        </NextAuthProvider>
      </body>
    </html>
  );
}
