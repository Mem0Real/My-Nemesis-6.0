import { motion, AnimatePresence } from "framer-motion";

import CategoryList from "../CategoryList";
import PriceModifier from "./PriceModifier";

import { useProductListContext } from "../ProductList";
import { useIcons } from "../../utils/CustomIcons";

export default function FilterData() {
  const {
    toggleCategory,
    togglePrice,
    categoryDrop,
    btnVariants,
    showPriceDrop,
    priceDrop,
  } = useProductListContext();
  const { RightArrowIcon } = useIcons();

  return (
    <div className="flex flex-row lg:flex-col items-start gap-1 lg:gap-3 w-[97%] mx-auto border-y border-neutral-600 dark:border-neutral-400 lg:border-none">
      <div className="basis-[20%] flex flex-col lg:flex-row lg:w-full">
        <h1 className="text-base lg:text-xl font-medium px-1 py-2 lg:px-0 lg:py-0 my-auto">
          Filter by
        </h1>
      </div>
      <div className="basis-[40%] flex flex-col lg:w-full">
        <div className="flex items-center justify-between w-full lg:border-y border-neutral-400 px-2 h-12  cursor-pointer text-sm">
          <h1 onClick={toggleCategory}>Category</h1>
          <motion.button
            className="text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400"
            onClick={toggleCategory}
            initail="close"
            animate={categoryDrop ? "open" : "close"}
            exit="close"
            variants={btnVariants}
          >
            {RightArrowIcon}
          </motion.button>
        </div>

        <CategoryList />
      </div>
      <div className="basis-[40%] flex flex-col lg:w-full">
        <div className="flex items-center justify-between lg:w-full lg:border-y border-neutral-400 px-2 h-12  cursor-pointer text-sm">
          <h1 onClick={() => showPriceDrop((prev) => !prev)}>Price</h1>
          <motion.button
            className="text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400"
            onClick={togglePrice}
            initail="close"
            animate={priceDrop ? "open" : "close"}
            exit="close"
            variants={btnVariants}
          >
            {RightArrowIcon}
          </motion.button>
        </div>

        <PriceModifier />
      </div>
    </div>
  );
}
