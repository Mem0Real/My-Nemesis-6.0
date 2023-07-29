import { motion, AnimatePresence } from "framer-motion";

import CategoryList from "../(categories)/categoryList";
import PriceModifier from "./priceModifier";

import { useProductListContext } from "../productList";
import { useIcons } from "../../utils/CustomIcons";

export default function FilterData() {
  const {
    toggleCategory,
    categoryDrop,
    btnVariants,
    showPriceDrop,
    priceDrop,
  } = useProductListContext();
  const { RightArrowIcon } = useIcons();

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-xl self-start font-medium ">Filter by</h1>
      <div className="flex items-center justify-between w-full border-y border-neutral-400 px-2 h-12 cursor-pointer text-sm">
        <h1>Category</h1>
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

      <div className="flex items-center justify-between w-full border-y border-neutral-400 px-2 h-12 cursor-pointer text-sm">
        <h1>Price</h1>
        <motion.button
          className="text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400"
          onClick={() => showPriceDrop((prev) => !prev)}
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
  );
}
