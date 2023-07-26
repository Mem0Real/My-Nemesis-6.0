import { motion, AnimatePresence } from "framer-motion";
import { useProductListContext } from "../productList";

export default function PriceModifier() {
  const { priceDrop, contentVariants } = useProductListContext();

  return (
    <AnimatePresence>
      {priceDrop && (
        <motion.div
          className={`w-full`}
          initial="closed"
          animate={priceDrop ? "opened" : "closed"}
          exit="closed"
          variants={contentVariants}
        >
          <h1>hi</h1>
          <h1>hi</h1>
          <h1>hi</h1>
          <h1>hi</h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
