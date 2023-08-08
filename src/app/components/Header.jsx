"use client";

import Image from "next/image";

import { motion } from "framer-motion";

const Header = () => {
  const introHeaderVariants = {
    hide: {
      opacity: 0,
      y: -50,
    },

    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2,
      },
    },
  };

  const introPictureVariants = {
    hide: {
      opacity: 0,
      x: 250,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      },
    },
  };
  return (
    <main className="relative flex w-full grow items-center justify-center py-12 px-4 md:px-12">
      <motion.header
        className="flex flex-col gap-4"
        initial="hide"
        whileInView="show"
        exit="hide"
        variants={introHeaderVariants}
      >
        <h1 className="text-center text-3xl md:text-5xl text-neutral-800 dark:text-neutral-200">
          My Nemesis
        </h1>
      </motion.header>
      {/* <motion.div
        className="absolute right-0 -bottom-12 w-full sm:w-4/5 md:-bottom-36 md:w-[950px]"
        initial="hide"
        whileInView="show"
        exit="hide"
        variants={introPictureVariants}
      >
        <Image
          src="/images/nemesisLogo.jpg"
          alt="My Nemesis"
          width={96}
          height={96}
          className="absolute right-0 -bottom-12 w-2/7 md:-bottom-36"
        />
      </motion.div>*/}
    </main>
  );
};

export default Header;
