"use client";

import { useState, useEffect } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";

import { useProductContext } from "@/context/productContext";
import { parseCookies } from "nookies";

import { motion, AnimatePresence } from "framer-motion";
const AddToCartModal = dynamic(() => import("@/app/cart/AddToCart"));

// TODO skip the add to cart modal and directly apply item to cart

export default function Item({ item }) {
  const [activeImage, setActiveImage] = useState("");
  const [modal, showModal] = useState(false);
  const [quantity, setQuantity] = useState();

  const [addToCartModal, showAddToCartModal] = useState(false);

  const { data, updater, purchasedData, setPurchasedData } =
    useProductContext();

  const cookieStore = parseCookies();

  useEffect(() => {
    if (addToCartModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [addToCartModal]);

  useEffect(() => {
    let product;
    if (cookieStore.Product && cookieStore?.Product !== undefined)
      product = JSON.parse(cookieStore.Product);

    if (product && product.length > 0) {
      for (let i = 0; i < product.length; i++) {
        if (product[i].id === item.id) {
          setQuantity(() => product[i].quantity);
          break;
        } else {
          setQuantity(() => item.quantity);
        }
      }
    } else {
      if (purchasedData?.length > 0) {
        for (let i = 0; i < purchasedData.length; i++) {
          if (purchasedData[i].id === item.id) {
            setQuantity(
              () => purchasedData[i].quantity - purchasedData[i].amount
            );
            setPurchasedData([]);
            break;
          } else {
            setQuantity(() => item.quantity);
            setPurchasedData([]);
          }
        }
      } else {
        setQuantity(() => item.quantity);
      }
    }
  }, [data, updater]);

  // Show image if any
  useEffect(() => {
    let image = item.images;

    if (image && activeImage === "") {
      setActiveImage(image[0]);
    }
  }, [activeImage, item.images]);

  const openImage = (image) => {
    setActiveImage(image);
  };

  const handleOrder = () => {
    showAddToCartModal(() => true);
  };

  const closeAddToCartModal = () => {
    showAddToCartModal(() => false);
  };

  const variants = {
    open: {
      opacity: 1,
      display: "flex",
    },
    close: {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    },
  };
  return (
    <div className="flex gap-7 flex-wrap lg:flex-nowrap w-full justify-center sm:justify-normal mx-auto mb-12">
      <div className="flex sm:items-center flex-col flex-wrap sm:flex-row w-full gap-12">
        <div className="flex-initial flex-wrap flex sm:flex-col gap-6 sm:gap-12 justify-center sm:justify-normal w-fit mx-auto border-b-4 sm:border-l-4 border-1 shadow-inner shadow-black order-2 sm:order-1">
          {item.images &&
            item.images.map((url, index) => {
              return (
                <div
                  key={index}
                  className={`relative h-12 w-12 ms-1 bg-neutral-900 rounded-sm cursor-pointer hover:outline outline-1 outline-neutral-200 ${
                    activeImage === url
                      ? "-translate-y-2 sm:translate-x-1 lg:translate-x-2 outline transition-all ease-in-out duration-500"
                      : "translate-y-0 sm:-translate-x-1 lg:-translate-x-2  transition-all ease-in-out duration-500"
                  }`}
                  onClick={() => openImage(url)}
                >
                  <Image
                    src={url}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
                    alt="Image"
                    className="object-contain"
                  />
                </div>
              );
            })}
        </div>
        <div className="relative h-56 w-full sm:w-auto grow order-1 sm:order-2 sm:mr-12">
          {activeImage && (
            <Image
              src={activeImage}
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
              alt="Image"
              className="object-contain rounded-lg"
              priority
            />
          )}
        </div>
      </div>
      <div className="h-fit w-[45em] justify-center sm:justify-normal mx-auto items-center">
        <div className="">
          <h1 className="text-4xl font-bold ms-4 mb-2">Product Details</h1>
          <div className="flex flex-col items-start ps-5 gap-7 py-6 w-full lg:w-[90%] bg-neutral-900 border border-neutral-200 text-neutral-200 rounded-xl drop-shadow-2xl ">
            <div className="flex gap-4 w-full">
              <h1 className=" text-md font-semibold">Product Name: </h1>
              <h2 className="ms-3 text-md"> {item.name}</h2>
            </div>
            <div className="flex gap-4 w-full">
              <h1 className="text-md font-semibold">Product Brand: </h1>
              <h2 className="ms-3 text-md"> {item.brand}</h2>
            </div>
            <div className="flex gap-4 w-full">
              <h1 className="text-md font-semibold">Product Model:</h1>
              <h2 className="ms-3 text-md"> {item.model}</h2>
            </div>
            <div className="w-[96%]">
              <h1 className="text-md font-semibold md:mb-3">Description</h1>
              <div className="h-48 border border-neutral-500 rounded-md">
                <h2 className="ms-3 text-md"> {item.description}</h2>
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <h1 className="text-md font-semibold">Quantity:</h1>
              <h2 className="ms-3 text-md">{quantity}</h2>
            </div>
            <div className="flex gap-4 w-full">
              <h1 className="text-md font-semibold">Price:</h1>
              {item.price && (
                <h2 className="ms-3 text-md flex gap-1">
                  {item.price}
                  <span className="text-neutral-400 py-0.5 text-sm font-medium  my-auto">
                    ETB
                  </span>
                </h2>
              )}
            </div>
            <div className="self-center">
              <motion.button
                key="addCategory"
                whileTap={{
                  scale: 0.95,
                }}
                whileHover={{
                  borderRadius: "12px",
                }}
                className="px-3 py-2 rounded-lg outline outline-1"
                onClick={handleOrder}
              >
                Add to Cart
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {addToCartModal && (
          <motion.div
            key="innerAddM"
            initial={"close"}
            animate={addToCartModal ? "open" : "close"}
            variants={variants}
            exit={"close"}
            className={`fixed top-0 bottom-0 right-0 left-0 z-10 bg-black/50 backdrop-blur-sm  flex ${
              addToCartModal ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <AddToCartModal
              item={item}
              addToCartModal={addToCartModal}
              closeAddToCartModal={closeAddToCartModal}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
