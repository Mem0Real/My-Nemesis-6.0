"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function LoginPage() {
  const [error, setError] = useState("");

  const router = useRouter();
  const { status } = useSession();

  const callbackUrl = router.query?.callbackUrl ?? "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-neutral-800">
      <form
        className="flex-1 flex flex-col justify-center items-center lg:gap-24 gap-12"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl text-neutral-200 font-black">Login Form</h1>
        {!!error && <p>{error}</p>}

        <div className="border-2 border-neutral-200 rounded-xl w-96 h-72 flex flex-col items-center justify-center gap-4">
          <div className="relative z-0 w-2/3 mb-6 group ">
            <input
              type="email"
              name="email"
              className="block py-2.5 px-0 w-full text-sm text-neutral-900 bg-transparent border-0 border-b-2 border-neutral-300 appearance-none dark:text-white dark:border-neutral-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />

            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>
          <div className="relative z-0 w-2/3 mb-6 group">
            <input
              type="password"
              name="password"
              className="block py-2.5 px-0 w-full text-sm text-neutral-900 bg-transparent border-0 border-b-2 border-neutral-300 appearance-none dark:text-white dark:border-neutral-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />

            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          <div className="mx-auto">
            <Button
              color="success"
              variant="outlined"
              className="capitalize"
              type="submit"
            >
              SignIn
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
