import Image from "next/image";
import Link from "next/link";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

import NavComponents from "./NavComponents";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav
      className="navbar w-full h-16 navbar bg-transparent
    text-neutral-800 dark:text-neutral-200 border-b border-neutral-400/60 dark:border-neutral-950 backdrop-blur-md shadow-md shadow-neutral-300 dark:shadow-blue-950/80 absolute z-30 transition-all ease-in-out duration-300"
    >
      <div className="relative md:flex justify-between md:justify-normal items-center w-full text-sm ">
        <div className="absolute md:static z-10 -mt-[8px] md:mt-0 px-4 md:px-2 lg:px-8 py-4">
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
