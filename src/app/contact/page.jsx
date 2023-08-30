"use client";

import React, { useState } from "react";

import PageWrapper from "../components/PageWrapper";
import Image from "next/image";
import Icons from "./components/Icons";

import { motion } from "framer-motion";
import { sendMessage } from "./utils/contactActions";
import { toast } from "react-hot-toast";
import Header from "../components/Header";

const Contact = () => {
	const [data, setData] = useState({ fullName: "", email: "", message: "" });
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSend = async (e) => {
		e.preventDefault();

		const toastId = toast.loading("Sending Message...");

		setLoading(() => true);

		const request = await sendMessage(data);
		setLoading(() => false);
		toast.remove(toastId);
		if (request?.error) {
			toast.remove(toastId);
			toast.error(request.error, { duration: 5000 });
		} else {
			toast.remove(toastId);
			toast.success(request.success);
			setData({ fullName: "", email: "", message: "" });
		}
	};
	return (
		<PageWrapper>
			<div className="w-full flex flex-col items-center justify-center py-8 md:py-10 lg:py-12 shadow-xl shadow-blue-600/20 dark:shadow-blue-400/10 text-neutral-800 dark:text-neutral-200">
				<Header title="Contact Us" className="font-extralight italic" />
			</div>
			<div className="flex flex-col md:flex-row w-[95%] md:w-[70%] mx-auto box-border py-6">
				<div className="flex-1 rounded-xl">
					<div className="relative z-0 w-full h-full flex flex-col items-center justify-center gap-5 py-12 md:py-0">
						<Image
							src="/images/contact-page.jpg"
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
							alt="Contact"
							className="object-cover object-center brightness-[.2]"
							priority
						/>

						<Icons />
					</div>
				</div>
				<div className="flex-1 h-full bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 box-content rounded-xl rounded-l-none py-12 md:py-0">
					<div className="flex flex-col gap-4 items-center justify-center">
						<h1 className="py-5 text-4xl font-semiBold">Send Us A Message</h1>
						<form
							onSubmit={handleSend}
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
									value={data.fullName || ""}
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
									value={data.email || ""}
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
									value={data.message || ""}
								/>
								<label
									htmlFor="message"
									className="peer-focus:font-medium absolute text-sm  text-neutral-600 dark:text-neutral-400 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
								>
									Message
								</label>
							</div>
							<div className="pb-12">
								<motion.button
									disabled={loading}
									name="submit"
									type="submit"
									className="px-4 py-1 rounded-md bg-transparent disabled:bg-neutral-500 text-neutral-800 dark:text-neutral-200 outline outline-2 outline-neutral-800 dark:outline-neutral-200"
									whileHover={{
										borderRadius: "10px",
									}}
									whileTap={{
										scale: 0.95,
									}}
									animate={loading ? { scale: 0.8 } : { scale: 1 }}
								>
									Send
								</motion.button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
};

export default Contact;
