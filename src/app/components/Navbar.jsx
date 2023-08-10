import Image from "next/image";
import Link from "next/link";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

import NavComponents from "./NavComponents";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav
      className="w-full md:h-16 h-fit navbar bg-neutral-100
    text-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 border-b border-neutral-400/60 dark:border-neutral-950 backdrop-blur-md shadow-md shadow-neutral-300 dark:shadow-blue-950/80 relative z-10 transition-all ease-in-out duration-300"
    >
      <div className="md:flex justify-between md:justify-normal items-center w-full h-full px-4 md:px-2 lg:px-8 py-4 text-sm">
        <div className="absolute md:static z-10 -mt-[8px] md:mt-0">
          <Link href="/">
            <div className="flex justify-evenly items-center">
              <div className="relative h-10 w-10 mx-2 lg:mx-0">
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
                className={`px-6 hidden lg:block text-lg uppercase font-medium tracking-wider`}
              >
                Nemesis
              </h1>
            </div>
          </Link>
        </div>
        <div className="flex flex-col justify-end w-full">
          <NavComponents session={session} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
