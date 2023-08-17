"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import PageWrapper from "../components/PageWrapper";

import { motion } from "framer-motion";

const description = [
  {
    heading: "Installation & Maintainance",
    subText: "On site installation and maintainance of all our products",
    image: "installation.png",
  },
  {
    heading: "Exceptional Customer Service",
    subText: "The customer is king indeed here in our work environment",
    image: "customer.png",
  },
  {
    heading: "1 Year Warranty",
    subText: "We offer a one year warranty for all products to our customers.",
    image: "warranty.png",
  },
  {
    heading: "Accountability",
    subText:
      "Incase of faulty or misconfigured products, we will immediately replace them free of charge.",
    image: "accountable.png",
  },
  {
    heading: "Training",
    subText:
      "We offer supplementary training of use of some of our bigger products.",
    image: "training.png",
  },
];

const Services = () => {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const { width, height } = dimension;

  return (
    <PageWrapper>
      <div className="w-full flex flex-col items-center justify-center py-8 md:py-10 lg:py-12 shadow-xl shadow-blue-600/20 text-neutral-800 dark:text-neutral-200">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight italic">
          Services
        </h1>
      </div>
      <motion.div className="w-[97%] lg:w-[95%] mx-auto">
        {description.map(({ heading, subText, image }, index) => {
          return (
            <motion.div
              id={index}
              key={index}
              className="flex flex-col lg:flex-row lg:odd:flex-row-reverse justify-center mt-24 md:gap-9 lg:gap-12 relative h-screen"
            >
              <motion.div
                className="lg:flex-1 flex flex-col items-center justify-center self-center justify-self-center my-auto py-6 gap-5 lg:gap-2"
                itemID={`${heading}-text`}
                initial={
                  ++index % 2 !== 0
                    ? {
                        opacity: 0,
                        x: -30,
                        y: 0,
                      }
                    : { opacity: 0, x: 30, y: 0 }
                }
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: { duration: 1, ease: "easeInOut" },
                }}
                exit={
                  ++index % 2 !== 0
                    ? {
                        opacity: 0,
                        x: -30,
                        y: 0,
                      }
                    : { opacity: 0, x: 30, y: 0 }
                }
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-center text-neutral-800 dark:text-neutral-200 text-3xl font-semibold">
                  {heading}
                </h2>
                <p className="text-center text-neutral-800 dark:text-neutral-200 text-lg">
                  {subText}
                </p>
              </motion.div>
              <motion.div
                itemID={`${heading}-image`}
                className="flex-1 flex flex-col items-center justify-center relative h-[70vh] my-auto border border-neutral-500 rounded-xl"
                initial={
                  width >= 1024
                    ? ++index % 2 === 0
                      ? {
                          opacity: 0,
                          x: -30,
                          y: 0,
                        }
                      : { opacity: 0, x: 30, y: 0 }
                    : { opacity: 0, x: 0, y: 30 }
                }
                whileInView={
                  width >= 1024
                    ? {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        transition: { duration: 1, ease: "easeInOut" },
                      }
                    : {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        transition: { duration: 1, ease: "easeInOut" },
                      }
                }
                exit={
                  width >= 1024
                    ? ++index % 2 === 0
                      ? {
                          opacity: 0,
                          x: -30,
                          y: 0,
                        }
                      : { opacity: 0, x: 30, y: 0 }
                    : { opacity: 0, x: 0, y: 30 }
                }
              >
                <Image
                  src={`/images/${image}`}
                  alt={heading}
                  fill
                  className="relative object-contain object-center w-full h-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
                  priority
                />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </PageWrapper>
  );
};

const ImageData = ({ images, y = 0 }) => {};
const TextData = ({ description, y = 0 }) => {};
export default Services;
