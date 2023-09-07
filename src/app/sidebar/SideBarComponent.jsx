"use client";

import { useState, useEffect, useRef, createContext, useContext } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "@/hooks/useDimensions";

import { MenuToggle } from "./components/MenuToggle";
import { Navigation } from "./components/Navigation";

const sidebar = {
	open: (height = 1000) => ({
		clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
		transition: {
			type: "spring",
			stiffness: 20,
			restDelta: 2,
		},
	}),
	closed: {
		clipPath: "circle(20px at 30px 30px)",
		transition: {
			delay: 0.5,
			type: "spring",
			stiffness: 400,
			damping: 40,
		},
	},
};

const SidebarContext = createContext({});

export default function SideBarComponent({ data }) {
	const [isOpen, toggleOpen] = useCycle(false, true);

	const [openSidebar, setOpenSidebar] = useState(false);
	const [openParent, setOpenParent] = useState({ id: null, open: false });
	const [openChild, setOpenChild] = useState({ id: null, open: false });
	const [openProduct, setOpenProduct] = useState({ id: null, open: false });

	const containerRef = useRef(null);

	const { height } = useDimensions(containerRef);

	// Close on click outside
	useEffect(() => {
		let handler = (e) => {
			if (!containerRef.current.contains(e.target)) {
				setOpenSidebar(() => false);
			}
		};

		document.addEventListener("mousedown", handler);

		return () => document.removeEventListener("mousedown", handler);
	}, []);

	const categories = data;

	const buttonVariants = {
		open: {
			rotate: 90,
			transition: {
				ease: "easeInOut",
				duration: 0.1,
				when: "afterChildren",
			},
		},
		closed: {
			rotate: 0,
			transition: {
				ease: "easeInOut",
				duration: 0.1,
			},
		},
	};

	const menuVariants = {
		open: {
			transition: { staggerChildren: 0.07, delayChildren: 0.2 },
		},
		closed: {
			transition: { staggerChildren: 0.05, staggerDirection: -1 },
		},
	};

	const itemVariants = {
		open: {
			y: 0,
			opacity: 1,
			transition: {
				y: { stiffness: 1000, velocity: -100 },
			},
		},
		closed: {
			y: 50,
			opacity: 0,
			transition: {
				y: { stiffness: 1000 },
			},
		},
	};

	const nestedItemVariants = {
		open: {
			y: 0,
			opacity: 1,
			transition: {
				y: { stiffness: 1000, velocity: -100 },
			},
		},
		closed: {
			y: -20,
			opacity: 0,
			transition: {
				y: { stiffness: 1000 },
			},
		},
	};

	const menuParentVariants = {
		open: {
			transition: {
				staggerChildren: 0.1,
				staggerDirection: 1,
				when: "afterChildren",
			},
		},
		closed: {
			transition: {
				staggerChildren: 0.1,
				staggerDirection: -1,
				when: "afterChildren",
			},
		},
	};
	const menuParentItemVariants = {
		closed: {
			opacity: 0,
		},
		open: { opacity: 1 },
	};

	const menuChildVariants = {
		closedChild: {
			transition: {
				staggerChildren: 0.1,
				staggerDirection: -1,
			},
		},
		openChild: {
			transition: {
				staggerChildren: 0.1,
				staggerDirection: 1,
			},
		},
	};
	const menuChildItemVariants = {
		closedChild: {
			opacity: 0,
		},
		openChild: { opacity: 1 },
	};

	const menuProductVariants = {
		closedProduct: {
			transition: {
				staggerChildren: 0.1,
				staggerDirection: -1,
				when: "afterChildren",
			},
		},
		openProduct: {
			transition: {
				staggerChildren: 0.1,
				staggerDirection: 1,
				when: "afterChildren",
			},
		},
	};
	const menuProductItemVariants = {
		closedProduct: {
			opacity: 0,
		},
		openProduct: { opacity: 1 },
	};

	const toggleSidebar = () => {
		setOpenSidebar((prev) => !prev);
		closeSidebars();
	};

	const toggleParent = (id) => {
		if (openParent) {
			if (openParent.id === id) {
				if (openParent?.open) {
					setOpenParent((prev) => ({ ...prev, open: false }));
					setOpenChild(null);
					setOpenProduct(null);
				} else {
					setOpenParent((prev) => ({ ...prev, open: true }));
				}
			} else {
				setOpenParent((prev) => ({ id: id, open: true }));
			}
		} else {
			setOpenParent(() => ({ id: id, open: true }));
		}
	};

	const toggleChild = (id) => {
		if (openChild) {
			if (openChild.id === id) {
				if (openChild?.open) {
					setOpenChild((prev) => ({ ...prev, open: false }));
					setOpenProduct(null);
				} else {
					setOpenChild((prev) => ({ ...prev, open: true }));
				}
			} else {
				setOpenChild(() => ({ id: id, open: true }));
			}
		} else {
			setOpenChild(() => ({ id: id, open: true }));
		}
	};

	const toggleProduct = (id) => {
		if (openProduct) {
			if (openProduct.id === id) {
				openProduct?.open
					? setOpenProduct((prev) => ({ ...prev, open: false }))
					: setOpenProduct((prev) => ({ ...prev, open: true }));
			} else {
				setOpenProduct(() => ({ id: id, open: true }));
			}
		} else {
			setOpenProduct(() => ({ id: id, open: true }));
		}
	};

	const closeSidebars = () => {
		setOpenParent();
		setOpenChild();
		setOpenProduct();
	};

	return (
		<SidebarContext.Provider
			value={{
				openSidebar,
				openParent,
				openChild,
				openProduct,
				buttonVariants,
				menuVariants,
				itemVariants,
				nestedItemVariants,
				menuParentVariants,
				menuParentItemVariants,
				menuChildVariants,
				menuChildItemVariants,
				menuProductVariants,
				menuProductItemVariants,
				toggleSidebar,
				toggleParent,
				toggleChild,
				toggleProduct,
			}}
		>
			<motion.nav
				initial={false}
				animate={openSidebar ? "open" : "closed"}
				// custom={height}
				ref={containerRef}
				className="absolute top-0 left-0 bottom-0 w-[300px] h-fit"
			>
				<motion.div
					className="absolute top-0 right-0 bottom-0 w-[300px] bg-white/90 dark:bg-black/95 h-full -z-10 rounded-br-md"
					variants={sidebar}
				/>
				<Navigation categories={categories} />
				<MenuToggle />
			</motion.nav>
		</SidebarContext.Provider>
	);
}
export const useSidebarContext = () => useContext(SidebarContext);
