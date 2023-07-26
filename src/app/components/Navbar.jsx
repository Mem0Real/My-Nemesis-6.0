import Image from "next/image";
import Link from "next/link";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import NavComponents from "./NavComponents";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav
      className="w-full md:h-16 h-fit navbar bg-neutral-100
    text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
    >
      <div className="md:flex justify-between md:justify-normal items-center w-full h-full px-4 lg:px-8 py-4 text-sm">
        <div className="absolute md:static z-10 -mt-[8px] md:mt-0">
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
          <NavComponents session={session} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
