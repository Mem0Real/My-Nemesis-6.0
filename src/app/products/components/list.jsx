import { motion, AnimatePresence } from "framer-motion";

import { useProductListContext } from "../productList";

// TODO add cookies to store opened data
export default function List() {
  const { products } = useProductListContext();

  return (
    <div className="basis-4/5 flex flex-col items-center min-h-screen">
      {products.map((product) => {
        return (
          <div key={product.id} className="flex flex-col gap-4">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
          </div>
        );
      })}
    </div>
  );
}
