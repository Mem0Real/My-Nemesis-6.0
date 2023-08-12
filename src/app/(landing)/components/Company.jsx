"use client";

import { motion } from "framer-motion";
import { useIcons } from "@/app/utils/CustomIcons";

export default function Company() {
  const { DeliveryTruckIcon, HourIcon, DiscountIcon, MaintainanceIcon } =
    useIcons();
  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 min-h-64 px-6 lg:px-12 py-12 flex flex-col md:flex-row flex-wrap items-center justify-center gap-12">
      <motion.div
        className="flex items-center justify-between w-full md:w-fit text-neutral-800 dark:text-neutral-200"
        initial={{ x: -50 }}
        exit={{ x: -50 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {DeliveryTruckIcon}
        <p>Shipping</p>
      </motion.div>
      <motion.div
        className="flex items-center justify-between w-full md:w-fit text-neutral-800 dark:text-neutral-200"
        initial={{ x: -150 }}
        exit={{ x: -150 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {HourIcon}
        <p>Available 24/7</p>
      </motion.div>
      <motion.div
        className="flex items-center justify-between w-full md:w-fit text-neutral-800 dark:text-neutral-200"
        initial={{ x: -250 }}
        exit={{ x: -250 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 0.7 }}
      >
        {DiscountIcon}
        <p>Low Prices guaranteed</p>
      </motion.div>
      <motion.div
        className="flex items-center justify-between w-full md:w-fit text-neutral-800 dark:text-neutral-200"
        initial={{ x: -350 }}
        exit={{ x: -350 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        {MaintainanceIcon}
        <p>On site installation</p>
      </motion.div>
    </div>
  );
}
