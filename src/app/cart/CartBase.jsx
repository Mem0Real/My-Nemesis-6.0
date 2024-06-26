"use client";

import React, {
	useState,
	useEffect,
	createContext,
	useContext,
	useRef,
} from "react";
import dynamic from "next/dynamic";

const CartModal = dynamic(() => import("./Cart"));
const ContactInfo = dynamic(() => import("./ContactInfo"));

import { useProductContext } from "@/context/ProductContext";
import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";

import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

const CartContext = createContext({});

export default function CartBase({ children }) {
	const [cartModal, showCartModal] = useState(false);
	const [infoModal, showInfoModal] = useState(false);
	const [newCart, setNewCart] = useState(false);

	const [cartList, setCartList] = useState();

	const { updater, setUpdater } = useProductContext();

	const cartModalRef = useRef();
	const infoModalRef = useRef();

	// Disable scrollbar on modal open
	// useEffect(() => {
	//   const handleWindowWheel = (event) => {
	//     if (cartModal || infoModal) {
	//       event.preventDefault();
	//     }
	//   };

	//   window.addEventListener("wheel", handleWindowWheel, { passive: false });

	//   return () => {
	//     window.removeEventListener("wheel", handleWindowWheel);
	//   };
	// }, [cartModal, infoModal]);
	useEffect(() => {
		const handleWindowWheel = (event) => {
			if (cartModal && !cartModalRef?.current.contains(event.target)) {
				event.preventDefault();
			}
			if (infoModal && !infoModalRef?.current.contains(event.target)) {
				event.preventDefault();
			}
		};

		window.addEventListener("wheel", handleWindowWheel, { passive: false });

		return () => {
			window.removeEventListener("wheel", handleWindowWheel);
		};
	}, [cartModal, infoModal]);

	// Disable lenis scroll on modal open
	useEffect(() => {
		const html = document.querySelector("html");
		cartModal || infoModal
			? (html.dataset.lenisPrevent = "")
			: delete html.dataset.lenisPrevent;
	}, [cartModal, infoModal]);

	const closeCartModal = () => {
		showCartModal(() => false);
		setUpdater((prev) => !prev);
	};

	// Close modals on click outside
	useEffect(() => {
		let handler = (e) => {
			if (cartModal && !cartModalRef.current.contains(e.target)) {
				closeCartModal();
			}
			if (infoModal && !infoModalRef.current.contains(e.target)) {
				closeInfoModal();
			}
		};

		document.addEventListener("mousedown", handler);

		return () => document.removeEventListener("mousedown", handler);
	}, [cartModal, infoModal, closeCartModal]);

	// Close Modals on key press "Esc"
	useEffect(() => {
		const esc = (e) => e.key === "Escape";

		const handler = (e) => {
			if (esc(e)) {
				closeCartModal();
				closeInfoModal();
			}
		};

		window.addEventListener("keyup", handler);

		return () => {
			window.removeEventListener("keyup", handler);
		};
	}, [closeCartModal]);

	// Update Cart Data
	useEffect(() => {
		let cart;

		if (hasCookie("Cart")) cart = JSON.parse(getCookie("Cart"));
		if (cart?.length > 0) {
			setCartList(() => cart);
			setNewCart(() => true);
		} else {
			setCartList(() => []);
			setNewCart(() => false);
		}
	}, [updater]);

	const openCartModal = () => {
		showCartModal(() => true);
	};

	const handleOrder = () => {
		closeCartModal();
		showInfoModal(() => true);
	};

	const closeInfoModal = () => {
		showInfoModal(() => false);
	};

	const clearCart = (submitted = false) => {
		deleteCookie("Cart", { path: "/" });
		deleteCookie("Product", { path: "/" });
		deleteCookie("Cart_State", { path: "/" });

		setCartList(() => []);
		submitted === false && toast("Cart cleared!");

		setTimeout(() => {
			closeCartModal();
		}, 100);
	};

	const TAX_RATE = 0.07;

	function ccyFormat(num) {
		return `${num.toFixed(2)}`;
	}

	function subtotal() {
		if (cartList?.length > 0) {
			let allPrice = cartList.map((items) => {
				return parseFloat(items.totalPrice);
			});
			allPrice = allPrice.reduce((sum, i) => sum + i, 0);
			return allPrice;
		}
	}

	const invoiceSubtotal = subtotal();
	const invoiceTaxes = TAX_RATE * invoiceSubtotal;
	const invoiceTotal = invoiceTaxes + invoiceSubtotal;

	const variants = {
		open: {
			opacity: 1,
			display: "flex",
		},
		close: {
			opacity: 0,
			transitionEnd: {
				display: "none",
				when: "afterChildren",
			},
		},
	};

	return (
		<CartContext.Provider
			value={{
				newCart,
				cartModal,
				openCartModal,
				infoModal,
				handleOrder,
				cartList,
				clearCart,
				TAX_RATE,
				ccyFormat,
				invoiceSubtotal,
				invoiceTaxes,
				invoiceTotal,
			}}
		>
			{children}
			<AnimatePresence className="my-3">
				{cartModal && (
					<motion.div
						key="innerCartM"
						id="innerCartM"
						itemID="icm"
						initial={"close"}
						animate={cartModal ? "open" : "close"}
						variants={variants}
						exit={"close"}
						className={`fixed top-0 bottom-0 right-0 left-0 z-40 bg-black/50 backdrop-blur-sm  flex ${
							cartModal ? "pointer-events-auto" : "pointer-events-none"
						}`}
					>
						<CartModal
							closeCartModal={closeCartModal}
							cartModalRef={cartModalRef}
							cartModal={cartModal}
						/>
					</motion.div>
				)}
				{infoModal && (
					<motion.div
						key="innerAddM"
						id="innerAddM"
						itemID="iam"
						initial={"close"}
						animate={infoModal ? "open" : "close"}
						variants={variants}
						exit={"close"}
						className={`fixed top-0 bottom-0 right-0 left-0 z-40 bg-black/50 backdrop-blur-sm  flex ${
							infoModal ? "pointer-events-auto" : "pointer-events-none"
						}`}
					>
						<ContactInfo
							cartList={cartList}
							orderTotalPrice={invoiceTotal}
							clearCart={clearCart}
							closeInfoModal={closeInfoModal}
							infoModalRef={infoModalRef}
							infoModal={infoModal}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</CartContext.Provider>
	);
}

export const useCartContext = () => useContext(CartContext);
