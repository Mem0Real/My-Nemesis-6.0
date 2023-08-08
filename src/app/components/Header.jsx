"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import MultiLayerParallax from "./MultiLayerParallax";

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
    // <main className="relative flex w-full grow items-center justify-center py-12 px-4 md:px-12">
    //   <motion.header
    //     className="flex flex-col gap-4"
    //     initial="hide"
    //     whileInView="show"
    //     exit="hide"
    //     variants={introHeaderVariants}
    //   >
    //     <h1 className="text-center text-3xl md:text-5xl text-neutral-800 dark:text-neutral-200">
    //       My Nemesis
    //     </h1>
    //   </motion.header>
    // </main>
    <main>
      <MultiLayerParallax />
      <div className="w-full bg-neutral-300 dark:bg-neutral-800">
        <div className="flex flex-col gap-12 items-center justify-center">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet.
            Mauris vitae ultricies leo integer malesuada nunc vel risus. Tellus
            in hac habitasse platea dictumst vestibulum rhoncus est. Dignissim
            convallis aenean et tortor at risus viverra adipiscing.{" "}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet.
            Mauris vitae ultricies leo integer malesuada nunc vel risus. Tellus
            in hac habitasse platea dictumst vestibulum rhoncus est. Dignissim
            convallis aenean et tortor at risus viverra adipiscing.{" "}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet.
            Mauris vitae ultricies leo integer malesuada nunc vel risus. Tellus
            in hac habitasse platea dictumst vestibulum rhoncus est. Dignissim
            convallis aenean et tortor at risus viverra adipiscing.{" "}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet.
            Mauris vitae ultricies leo integer malesuada nunc vel risus. Tellus
            in hac habitasse platea dictumst vestibulum rhoncus est. Dignissim
            convallis aenean et tortor at risus viverra adipiscing.{" "}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet.
            Mauris vitae ultricies leo integer malesuada nunc vel risus. Tellus
            in hac habitasse platea dictumst vestibulum rhoncus est. Dignissim
            convallis aenean et tortor at risus viverra adipiscing.{" "}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet.
            Mauris vitae ultricies leo integer malesuada nunc vel risus. Tellus
            in hac habitasse platea dictumst vestibulum rhoncus est. Dignissim
            convallis aenean et tortor at risus viverra adipiscing.{" "}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet.
            Mauris vitae ultricies leo integer malesuada nunc vel risus. Tellus
            in hac habitasse platea dictumst vestibulum rhoncus est. Dignissim
            convallis aenean et tortor at risus viverra adipiscing.{" "}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet.
            Mauris vitae ultricies leo integer malesuada nunc vel risus. Tellus
            in hac habitasse platea dictumst vestibulum rhoncus est. Dignissim
            convallis aenean et tortor at risus viverra adipiscing.{" "}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Header;
