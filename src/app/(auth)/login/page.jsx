"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

import { Button } from "@mui/material";
import { toast } from "react-hot-toast";

import { setCookie } from "nookies";

export default function LoginPage() {
  const [error, setError] = useState("");

  const router = useRouter();

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
    <div className="flex flex-col justify-center items-center min-h-screen bg-neutral-800">
      <form
        className="flex-1 flex flex-col justify-center items-center lg:gap-24 gap-12"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl text-neutral-300 font-black">Login Form</h1>
        <div className="border-2 border-neutral-300 rounded-xl w-96 h-72 flex flex-col items-center justify-center gap-4">
          <div className="relative z-0 w-2/3 mb-9 group bg-neutral-800">
            <input
              type="email"
              name="email"
              className="block py-2.5 px-0 w-full text-sm text-neutral-300 bg-transparent border-0 border-b-2 border-neutral-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              autoComplete="email"
              autoFocus={true}
            />

            <label
              htmlFor="email"
              className="text-base absolute peer-placeholder-shown:text-sm text-neutral-300 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
            >
              Email
            </label>
          </div>
          <div className="relative z-0 w-2/3 mb-6 group">
            <input
              type="password"
              name="password"
              className="block py-2.5 px-0 w-full text-sm text-neutral-300 bg-transparent border-0 border-b-2 border-neutral-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              autoComplete="current-password"
            />

            <label
              htmlFor="password"
              className="peer-focus:text-base absolute text-sm text-neutral-300 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
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
              Sign In
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
