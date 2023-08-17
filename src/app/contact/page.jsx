"use client";

import React, { useState } from "react";

import PageWrapper from "../components/PageWrapper";
import Image from "next/image";
import Icons from "./components/Icons";

import { motion } from "framer-motion";

const Contact = () => {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData(() => ({ [e.target.name]: e.target.value }));
  };

  return (
    <PageWrapper>
      <div className="w-full flex flex-col items-center justify-center py-8 md:py-10 lg:py-12 shadow-xl shadow-blue-600/20 dark:shadow-blue-400/10 text-neutral-800 dark:text-neutral-200">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight italic">
          Contact Us
        </h1>
      </div>
      <div className="h-screen flex flex-col md:flex-row w-[70%] mx-auto box-border mt-6">
        <div className="flex-1 h-full rounded-xl">
          <div className="relative z-0 w-full h-full flex flex-col items-center justify-center gap-5">
            <Image
              fill
              src="/images/contact-page.jpg"
              alt="Contact"
              className="object-cover object-center brightness-[.2]"
              priority
            />

            <Icons />
          </div>
        </div>
        <div className="flex-1 h-full bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 box-content rounded-xl rounded-l-none">
          <div className="flex flex-col gap-4 items-center justify-center">
            <h1 className="py-5 text-4xl font-semiBold">Send Us A Message</h1>
            <form
              action=""
              className="w-[90%] mx-auto flex flex-col justify-center items-center gap-12 mt-6"
            >
              <div className="relative z-0 group w-3/4 mx-auto">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="block py-2.5 px-0 w-full text-sm text-neutral-800 dark:text-neutral-200 bg-transparent border-0 border-b-2 border-neutral-400 appearance-none dark:border-neutral-800 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleChange}
                />
                <label
                  htmlFor="fullName"
                  className="peer-focus:font-medium absolute text-sm  text-neutral-600 dark:text-neutral-400 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
                >
                  Full Name
                </label>
              </div>
              <div className="relative z-0 group w-3/4 mx-auto">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="block py-2.5 px-0 w-full text-sm text-neutral-800 dark:text-neutral-200 bg-transparent border-0 border-b-2 border-neutral-400 appearance-none dark:border-neutral-800 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleChange}
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-sm  text-neutral-600 dark:text-neutral-400 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
                >
                  Email
                </label>
              </div>
              <div className="relative z-0 w-3/4 group">
                <textarea
                  cols={8}
                  rows={8}
                  id="message"
                  name="message"
                  type="text"
                  className="block py-2.5 px-0 w-full text-sm text-neutral-800 dark:text-neutral-200 bg-transparent border-0 border-b-2 border-neutral-400 appearance-none dark:border-neutral-800 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleChange}
                />
                <label
                  htmlFor="message"
                  className="peer-focus:font-medium absolute text-sm  text-neutral-600 dark:text-neutral-400 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
                >
                  Message
                </label>
              </div>
              <motion.button
                disabled={loading}
                name="submit"
                type="submit"
                className="px-4 py-1 rounded-md bg-transparent text-neutral-800 dark:text-neutral-200 outline outline-2 outline-neutral-800 dark:outline-neutral-200"
                whileHover={{
                  borderRadius: "10px",
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                Send
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Contact;
