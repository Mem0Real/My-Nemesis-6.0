"use client";
import { useIcons } from "../utils/CustomIcons";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FooterComponents() {
	const { FacebookIcon, TelegramIcon, InstagramIcon } = useIcons();

	return (
		<motion.div className="flex items-start justify-around md:justify-start gap-5">
			<motion.span
				initial={{ scale: 1 }}
				whileHover={{ scale: 1.2 }}
				transition={{ duration: 0.2, ease: "linear" }}
			>
				<Link
					href="https://facebook.com"
					className="text-blue-600"
					target="_blank"
				>
					{FacebookIcon}
				</Link>
			</motion.span>
			<motion.span
				initial={{ scale: 1 }}
				whileHover={{ scale: 1.2 }}
				transition={{ duration: 0.2, ease: "linear" }}
			>
				<Link
					href="https://telegram.com"
					className="text-blue-600"
					target="_blank"
				>
					{TelegramIcon}
				</Link>
			</motion.span>
			<motion.span
				initial={{ scale: 1 }}
				whileHover={{ scale: 1.2 }}
				transition={{ duration: 0.2, ease: "linear" }}
			>
				<Link
					href="https://instagram.com"
					className="text-pink-600"
					target="_blank"
				>
					{InstagramIcon}
				</Link>
			</motion.span>
		</motion.div>
	);
}
