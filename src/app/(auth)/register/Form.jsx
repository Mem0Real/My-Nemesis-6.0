"use client";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import { toast } from "react-hot-toast";

export default function RegisterForm({ createUser }) {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const data = await createUser(name, email, password);

    if (data?.error) {
      toast.error(data.error);
    } else {
      toast.success("User added successfully!");
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-neutral-800">
      <form
        className="flex-1 flex flex-col justify-center items-center lg:gap-24 gap-12"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl text-neutral-200 font-black">Register User</h1>
        <div className="border-2 border-neutral-200 rounded-xl w-96 h-96 flex flex-col items-center justify-center gap-4">
          <div className="relative z-0 w-2/3 mb-9 group ">
            <input
              type="name"
              name="name"
              className="block py-2.5 px-0 w-full text-sm text-neutral-900 bg-transparent border-0 border-b-2 border-neutral-300 appearance-none dark:text-white dark:border-neutral-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              autoComplete="name"
              autoFocus={true}
            />

            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
            >
              Name
            </label>
          </div>
          <div className="relative z-0 w-2/3 mb-9 group ">
            <input
              type="email"
              name="email"
              className="block py-2.5 px-0 w-full text-sm text-neutral-900 bg-transparent border-0 border-b-2 border-neutral-300 appearance-none dark:text-white dark:border-neutral-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              autoComplete="email"
              autoFocus={true}
            />

            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
            >
              Email
            </label>
          </div>
          <div className="relative z-0 w-2/3 mb-9 group">
            <input
              type="password"
              name="password"
              className="block py-2.5 px-0 w-full text-sm text-neutral-900 bg-transparent border-0 border-b-2 border-neutral-300 appearance-none dark:text-white dark:border-neutral-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              autoComplete="current-password"
            />

            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
            >
              Password
            </label>
          </div>

          <div className="mx-auto">
            <motion.button
              key="signUp"
              whileTap={{
                scale: 0.9,
              }}
              whileHover={{
                borderRadius: "12px",
              }}
              className="px-4 py-2 rounded-lg outline outline-1 outline-blue-600 mb-4"
              type="submit"
            >
              SignUp
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
}
