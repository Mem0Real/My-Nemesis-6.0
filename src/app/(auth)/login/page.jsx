"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

import { motion } from "framer-motion";

import { toast } from "react-hot-toast";

import { setCookie } from "nookies";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    const toastId = toast.loading("Authenticating");
    setLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    toast.remove(toastId);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Logged in successfully!");
      setCookie(null, "accessToken", result.accessToken);

      // Refresh the page to update the session
      router.refresh();
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
      <form
        className="flex-1 flex flex-col justify-center items-center lg:gap-24 gap-12"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl text-neutral-800 dark:text-neutral-200 font-black">
          Login Form
        </h1>
        <div className="border-2 border-neutral-800 dark:border-neutral-200 rounded-xl w-96 h-72 flex flex-col items-center justify-center gap-4">
          <div className="relative z-0 w-2/3 mb-9 group">
            <input
              type="email"
              name="email"
              className="block py-2.5 px-0 w-full text-sm text-neutral-800 dark:text-neutral-200 bg-transparent border-0 border-b-2 border-neutral-800 dark:border-neutral-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer disabled:border-neutral-800 disabled:dark:border-neutral-200"
              placeholder=" "
              autoComplete="email"
              autoFocus={true}
              disabled={loading}
            />

            <label
              htmlFor="email"
              className="text-base absolute peer-placeholder-shown:text-sm text-text-neutral-700 dark:neutral-300 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
            >
              Email
            </label>
          </div>
          <div className="relative z-0 w-2/3 mb-6 group">
            <input
              type="password"
              name="password"
              className="block py-2.5 px-0 w-full text-sm text-neutral-800 dark:text-neutral-200 bg-transparent border-0 border-b-2 border-neutral-800 dark:border-neutral-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer disabled:border-neutral-800 disabled:dark:border-neutral-200"
              placeholder=" "
              autoComplete="current-password"
              disabled={loading}
            />

            <label
              htmlFor="password"
              className="peer-focus:text-base absolute text-sm text-neutral-700 dark:text-neutral-300 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
            >
              Password
            </label>
          </div>

          <div className="mx-auto">
            <motion.button
              key="signIn"
              animate={
                loading
                  ? { scale: 0.9, outlineColor: "rgb(156 163 175)" }
                  : { scale: 1, outlineColor: "#2563eb" }
              }
              whileTap={
                !loading
                  ? {
                      scale: 0.9,
                      outlineWidth: "2px",
                    }
                  : {
                      outlineWidth: "2px",
                    }
              }
              whileHover={
                !loading && {
                  borderRadius: "12px",
                }
              }
              className="px-4 py-2 rounded-lg outline outline-1"
              type="submit"
              disabled={loading}
            >
              Login
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
}
