import { useState, useEffect, useRef } from "react";
import { sendOrder } from "./CartActions";

import { useProductContext } from "@/context/productContext";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function ContactInfo({
  cartList,
  orderTotalPrice,
  clearCart,
  closeInfoModal,
}) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const { setPurchasedData } = useProductContext();
  const modalRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!modalRef.current.contains(e.target)) {
        closeInfoModal();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(() => true);
    const toastId = toast.loading("Sending Purchased data. Please wait...");

    const res = await sendOrder(user, cartList, orderTotalPrice);

    setLoading(() => false);

    if (res.error) {
      toast.remove(toastId);
      toast.error(res.error, {
        duration: 10000,
      });
    } else {
      toast.remove(toastId);
      toast.success(res.success, {
        duration: 2000,
        id: toastId,
      });
      toast.success(res.message, {
        duration: 5000,
      });
      setPurchasedData(() => cartList);
      setUser(() => {});
      closeInfoModal();
      clearCart();
    }
  };

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <section
      className="h-fit my-auto w-[90%] sm:w-[75%] md:w-[40%] lg:w-[30%] mx-auto overflow-y-scroll no-scrollbar rounded-lg bg-neutral-900"
      ref={modalRef}
    >
      <header className="pb-4 relative">
        <button
          name="close-contact-modal"
          type="button"
          className="absolute top-3 right-5 text-white bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          data-modal-hide="authentication-modal"
          onClick={() => closeInfoModal()}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="py-5">
          <h3 className="mb-4 border-b border-neutral-200 py-4 text-xl text-center font-medium text-neutral-200">
            Your order is being processed
          </h3>
          <h1 className="pt-3 text-lg px-2 text-center">
            Please enter your information below
          </h1>
        </div>
      </header>
      <main>
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col justify-center items-center gap-4 w-full"
        >
          <div className=" border p-5 py-12 rounded-md shadow-inner shadow-neutral-500 w-[95%]">
            <div className="relative z-0 mb-9 group">
              <input
                id="fullname"
                name="fullname"
                type="text"
                placeholder=" "
                className="block py-2.5 ps-2 w-full text-sm text-neutral-300 bg-transparent border-0 border-b-2 border-neutral-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={user?.fullname || ""}
                onChange={handleChange}
              />
              <label
                htmlFor="fullname"
                className="text-base absolute peer-placeholder-shown:text-sm
                    text-neutral-300 duration-300 transform -translate-y-9
                    scale-75 top-3 -z-10 origin-[0] peer-focus:left-0
                    peer-focus:text-blue-600 peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-0 peer-focus:scale-75
                    peer-focus:-translate-y-9"
              >
                Full Name
              </label>
            </div>

            <div className="relative z-0 mb-6 group flex flex-row-reverse items-center border-0 border-b-2 border-neutral-600 gap-2 ">
              <input
                id="phone"
                name="phone"
                type="tel"
                className="block py-2.5 px-0 w-full text-sm text-neutral-900 bg-transparent appearance-none dark:text-white dark:border-neutral-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={user?.phone || ""}
                placeholder=" "
                onChange={handleChange}
              />
              <p className="text-sm text-neutral-500 peer-focus:opacity-100 peer-placeholder-shown:opacity-0 bg-transparent py-2 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 transition-opacity ease-in duration-100">
                +251
              </p>
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500  peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
              >
                Phone Number
              </label>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 w-full">
            <motion.button
              key="contactInfoBtn"
              type="submit"
              disabled={loading}
              whileTap={
                !loading && {
                  scale: 0.9,
                }
              }
              whileHover={
                !loading && {
                  borderRadius: "12px",
                }
              }
              className="px-4 py-2 rounded-lg outline outline-1 outline-green-700 mb-4"
            >
              Confirm
            </motion.button>
            <motion.button
              key="cancelInfo"
              whileTap={{
                scale: 0.9,
              }}
              whileHover={{
                borderRadius: "12px",
              }}
              className="px-4 py-2 rounded-lg outline outline-1 mb-4 disabled:bg-neutral-500 scale-90"
              onClick={closeInfoModal}
              disabled={loading}
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </main>
    </section>
  );
}
