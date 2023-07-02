"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import AddToCart from "./components/AddToCart";
import { useItemContext } from "@/context/itemContext";

export default function Item({ item }) {
  const [activeImage, setActiveImage] = useState("");
  const [modal, showModal] = useState(false);

  const { currentQuantity, fetchCache } = useItemContext();

  useEffect(() => {
    console.log("Qty change: ", currentQuantity);
  }, [currentQuantity]);

  useEffect(() => {
    fetchCache(item.id, item.quantity);
    console.log("Refresh");
    // const data = JSON.parse(window.localStorage.getItem("Product_Data"));
    // if (data && data.length > 0) {
    //   for (let i = 0; i < data.length; i++) {
    //     if (data[i].id === item.id) {
    //         setCurrentQuantity(() => data[i].remainingQty);
    //       break;
    //     } else {
    //       setCurrentQuantity(() => item.quantity);
    //     }
    //   }
    // } else {
    //       setCurrentQuantity(() => item.quantity);
    //     }
  }, [currentQuantity, item]);

  useEffect(() => {
    let image = item.images;

    if (image && activeImage === "") {
      setActiveImage(image[0]);
    }
  }, [activeImage, item.images]);

  // const fetchCache = () => {
  //   const data = JSON.parse(window.localStorage.getItem("Product_Data"));
  //   if (data.length > 0) {
  //     data.map((product) => {
  //       if (product.id === item.id) {
  //         console.log("PI", product.id);
  //         console.log("Item", item.id);
  //         setCurrentQuantity(() => product.remainingQty);
  //       }
  //     });
  //   } else setCurrentQuantity(() => item.quantity);
  // };

  const openImage = (image) => {
    setActiveImage(image);
  };

  const handleOrder = () => {
    showModal(true);
  };

  const closeModal = () => {
    showModal(false);
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
              <h2 className="ms-3 text-md">{currentQuantity}</h2>
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
              <button
                className="py-2 px-2 rounded-lg outline outline-1 outline-neutral-200 hover:outline-2 ring-offset-2 active:ring-2"
                onClick={handleOrder}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddToCart
        item={item}
        modal={modal}
        closeModal={closeModal}
        // fetchCache={fetchCache}
      />
    </div>
  );
}
