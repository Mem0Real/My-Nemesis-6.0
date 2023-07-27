import { motion, AnimatePresence } from "framer-motion";

import { useProductListContext } from "../productList";

export default function List() {
  const { filterCatData, categories, products } = useProductListContext();

  return filterCatData?.length > 0 ? (
    <div className="basis-4/5 flex flex-col items-center justify-start min-h-screen pt-5 gap-3">
      {categories.map((category) => {
        if (filterCatData?.includes(category.id)) {
          return category.parents.map((parent) => {
            return parent.children.map((child) => {
              return child.items.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex flex-col items-center gap-3"
                  >
                    {item.name}
                  </div>
                );
              });
            });
          });
        }
      })}
    </div>
  ) : (
    <div className="basis-4/5 flex flex-col md:flex-row items-center md:items-start min-h-screen justify-evenly pt-5 gap-3">
      {products.map((product) => {
        return (
          <div key={product.id} className="flex-wrap">
            {product.name}
          </div>
        );
      })}
    </div>
  );
}
