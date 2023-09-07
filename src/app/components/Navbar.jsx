"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import { motion, useScroll } from "framer-motion";
import NavComponents from "./NavComponents";

export default function Navbar({ session }) {
	const [hidden, setHidden] = useState(false);

	const { scrollY } = useScroll();

	function update() {
		if (scrollY?.current < scrollY?.prev) {
			setHidden(false);
		} else if (scrollY?.current > 100 && scrollY?.current > scrollY?.prev) {
			setHidden(true);
		}
	}

	useEffect(() => {
		return scrollY.on("change", update);
	});

	const variants = {
		visible: { opacity: 1, y: 0 },
		hidden: { opacity: 0, y: -25 },
	};
	return (
		<motion.nav
			variants={variants}
			animate={hidden ? "hidden" : "visible"}
			transition={{
				ease: [0.1, 0.25, 0.3, 1],
				duration: 0.6,
			}}
			className="fixed w-full h-16 navbar bg-transparent
      text-neutral-800 dark:text-neutral-200 border-b border-neutral-400/60 dark:border-neutral-950 backdrop-blur-md shadow-md shadow-neutral-300 dark:shadow-blue-950/80 z-30"
		>
			<div className="relative md:flex justify-between md:justify-normal items-center w-full text-sm ">
				<div className="absolute md:static z-10 -mt-[8px] md:mt-0 px-4 md:px-2 lg:px-8 py-4">
					<Link href="/">
						<div className="flex justify-evenly items-center">
							<div className="relative h-10 w-10 mx-2 lg:mx-0">
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
								className={`px-6 hidden lg:block text-lg uppercase font-medium tracking-wider`}
							>
								Nemesis
							</h1>
						</div>
					</Link>
				</div>
				<div className="flex flex-col justify-end w-full">
					<NavComponents session={session} hidden={hidden} />
				</div>
			</div>
		</motion.nav>
	);
}
