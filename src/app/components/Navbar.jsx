import Image from "next/image";
import Link from "next/link";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

// import { Raleway } from "next/font/google";

import NavComponents from "./NavComponents";
import { getAll } from "../search/searchActions";

// const raleway = Raleway({
//   subsets: ["cyrillic"],
//   display: "swap",
// });
// import { getEntry } from "../search/searchActions";

export const Navbar = async () => {
  const fetchSession = getServerSession(authOptions);
  const fetchData = getAll();

  const [session, data] = await Promise.all([fetchSession, fetchData]);

  return (
    <nav className="w-full md:h-16 h-fit shadow-xl bg-neutral-900 text-white navbar drop-shadow-xl">
      <div className="md:flex justify-between md:justify-normal items-center w-full h-full px-4 lg:px-8 py-4 text-sm">
        <div className="absolute md:static z-40 -mt-[8px] md:mt-0">
          <Link href="/">
            <div className="flex justify-evenly items-center">
              <div className="relative h-12 w-12">
                <Image
                  src="/images/nemesisLogo.jpg"
                  alt="logo"
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="cursor-pointer rounded-full object-cover"
                  priority
                />
              </div>
              <h1
                className={`lg:px-12 px-6 hidden sm:block text-xl uppercase font-medium tracking-wider`}
              >
                Nemesis
              </h1>
            </div>
          </Link>
        </div>
        <div className="flex flex-col justify-end w-full">
          <NavComponents data={data} getAll={getAll} session={session} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
