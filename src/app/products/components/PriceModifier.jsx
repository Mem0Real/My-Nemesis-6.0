import { motion, AnimatePresence } from "framer-motion";
import { useProductListContext } from "../ProductList";
import { useState, useEffect } from "react";
import useCustomRouter from "@/hooks/useCustomRouter";

export default function PriceModifier() {
  const [text, setText] = useState({ price: 0 });

  const { pushQuery, query } = useCustomRouter();

  const { priceDrop, contentVariants, range } = useProductListContext();

  useEffect(() => {
    handlePrice(text);
  }, [text]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePrice(text);
  };

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.value) {
      setText(() => ({ price: e.target.value }));
    } else {
      setText(() => ({ price: 0 }));
    }
  };
  async function handlePrice(query) {
    pushQuery(query);
  }

  const { minPrice, maxPrice } = range;

  const min = minPrice._min.price;
  const max = maxPrice._max.price;

  return (
    <AnimatePresence>
      {priceDrop && (
        <motion.div
          initial="closed"
          animate={priceDrop ? "opened" : "closed"}
          exit="closed"
          variants={contentVariants}
          className="w-full flex flex-col items-center justify-end gap-2"
        >
          <p className="text-md italic py-5">{text.price}</p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-2">
              {min}
              <input
                type="range"
                name="priceRange"
                min={min}
                max={max}
                defaultValue={text.price || query.price || 0}
                onChange={handleChange}
              />
              {max}
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
