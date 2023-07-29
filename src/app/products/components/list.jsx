import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";

import { useProductListContext } from "../productList";
import Image from "next/image";

// TODO add cookies to store opened data
export default function List() {
  const { products } = useProductListContext();

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen">
        <div className="text-lg text-neutral-800 dark:text-neutral-200 mt-36">
          Product not found. Please adjust your filter and try again.
        </div>
      </div>
    );
  }
  // return (
  //   <div className="flex items-center content-start justify-center flex-wrap gap-10 py-6 w-full">
  //     {products.map((product) => {
  //       let image = product.images[0];
  //       return (
  //         <div
  //           key={product.id}
  //           className="flex flex-col gap-8 w-72 h-60 items-center mb-12"
  //         >
  //           <Link
  //             href={`/collection/${product.CategoryId}/${product.ParentId}/${product.ChildId}/${product.id}`}
  //           >
  //             <motion.div
  //               className={`relative w-60 h-60 cursor-pointer`}
  //               whileHover={{
  //                 scale: 1.25,
  //                 transition: { duration: 0.25 },
  //               }}
  //             >
  //               {product.images.length > 0 && (
  //                 <Image
  //                   src={image}
  //                   alt={product.id}
  //                   fill={true}
  //                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  //                   className="absolute object-contain object-center overflow-crop"
  //                 />
  //               )}
  //             </motion.div>
  //           </Link>
  //           <h1 className="text-center">{product.name}</h1>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );

  // return (
  //   <div className="w-full grid gap-x-0 gap-y-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-neutral-300/80 dark:border-neutral-900/80">
  //     {products.map((product) => {
  //       let image = product.images[0];
  //       return (
  //         <Link
  //           key={product.id}
  //           href={`/collection/${product.CategoryId}/${product.ParentId}/${product.ChildId}/${product.id}`}
  //         >
  //           <div className="grid grid-cols-1 gap-12 justify-between w-[90%] h-fit place-content-center border border-neutral-300/80 dark:border-neutral-900/80">
  //             <motion.div
  //               className="relative w-56 h-56 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-60 lg:h-60 mx-auto justify-self-center"
  //               whileHover={{ scale: 1.1, overflow: "hidden" }}
  //             >
  //               {product.images.length > 0 && (
  //                 <Image
  //                   src={image}
  //                   alt={product.id}
  //                   fill
  //                   sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
  //                   className="object-contain object-center"
  //                 />
  //               )}
  //             </motion.div>
  //             <motion.div
  //               className="flex flex-col items-start shadow-myShadow1 text-lg bg-neutral-300 pb-5"
  //               whileHover={{
  //                 scale: 1.05,
  //                 transition: {
  //                   type: "spring",
  //                   damping: 25,
  //                   stiffness: 120,
  //                 },
  //               }}
  //             >
  //               <motion.h1
  //                 className="text-start pl-5 w-fit"
  //                 whileHover={{
  //                   outlineOffset: "4px",
  //                 }}
  //               >
  //                 {product.name}
  //               </motion.h1>
  //             </motion.div>
  //           </div>
  //         </Link>
  //       );
  //     })}
  //   </div>
  // );

  return (
    <div className="grid w-full min-h-screen gap-x-0 gap-y-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-evenly">
      {products.map((product) => {
        let image = product.images[0];
        let price;
        price = product.price ? product.price?.toLocaleString() : 0;
        return (
          <Link
            key={product.id}
            href={`/collection/${product.CategoryId}/${product.ParentId}/${product.ChildId}/${product.id}`}
          >
            <div className="grid grid-cols-1 gap-12 justify-between w-full h-fit place-content-center border border-neutral-300/80 dark:border-neutral-600/80">
              <motion.div
                className="relative w-56 h-56 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-60 lg:h-60 mx-auto justify-self-center"
                whileHover={{ scale: 1.1, overflow: "hidden" }}
              >
                {product.images?.length > 0 && (
                  <Image
                    src={image}
                    alt={product.id}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain object-center"
                  />
                )}
              </motion.div>
              <motion.div className="flex flex-col items-start pb-5 text-base">
                <motion.h1 className="text-start pl-5 w-fit hover:underline underline-offset-2 font-semibold">
                  {product.name}
                </motion.h1>
                <motion.h1 className="text-start font-thin text-neutral-800 dark:text-neutral-200 pl-5 w-fit hover:animate-pulse">
                  ${price}.00
                  <span className="px-2 text-[14px] italic font-light text-neutra-600 dark:text-neutral-400">
                    ETB
                  </span>
                </motion.h1>
              </motion.div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
