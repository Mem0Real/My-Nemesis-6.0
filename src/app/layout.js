import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./globals.css";
import CartDataContext from "@/context/cartContext";
import ProductDataContext from "@/context/productContext";

export const metadata = {
  title: "My Nemesis 6.0",
  description:
    "Full Stack page offering product market display based on ethio machineries",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartDataContext>
          <ProductDataContext>
            <div className="flex flex-col justify-between h-full overflow-x-hidden no-scrollbar overflow-y-auto overscroll-y-none bg-neutral-100 relative">
              <Navbar />
              <div className={`min-h-screen`}>{children}</div>
              <div className="w-full">
                <Footer />
              </div>
            </div>
          </ProductDataContext>
        </CartDataContext>
      </body>
    </html>
  );
}
