"use client";

import { useState, useEffect, useRef, createContext, useContext } from "react";
import { motion, useScroll } from "framer-motion";
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
	const [hidden, setHidden] = useState(false);
	const [barHide, setBarHide] = useState(false);

	const [openSidebar, setOpenSidebar] = useState(false);
	const [openParent, setOpenParent] = useState({ id: null, open: false });
	const [openChild, setOpenChild] = useState({ id: null, open: false });
	const [openProduct, setOpenProduct] = useState({ id: null, open: false });

	const containerRef = useRef(null);

	const { height } = useDimensions(containerRef);

	const { scrollY } = useScroll();

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	function update(status = null) {
		if (!status) {
			if (scrollY?.current < scrollY?.prev) {
				setHidden(false);
			} else if (scrollY?.current > 100 && scrollY?.current > scrollY?.prev) {
				setHidden(true);
			}
		}
		scrollYProgress < 0.3 && setOpenSidebar(false);
	}

	useEffect(() => {
		return openSidebar
			? scrollY.on("change", () => update("opened"))
			: scrollY.on("change", () => update());
	}, [openSidebar]);

	// Close on click outside
	useEffect(() => {
		let handler = (e) => {
			if (!containerRef.current.contains(e.target)) {
				setOpenSidebar(false);
			}
		};

		document.addEventListener("mousedown", handler);

		return () => document.removeEventListener("mousedown", handler);
	}, []);

	const categories = data;

	const svgVariant = {
		visible: { opacity: 1 },
		hidden: { opacity: 0 },
	};

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
				hidden,
				openSidebar,
				openParent,
				openChild,
				openProduct,
				svgVariant,
				buttonVariants,
				menuVariants,
				itemVariants,
				nestedItemVariants,
				toggleSidebar,
				toggleParent,
				toggleChild,
				toggleProduct,
			}}
		>
			<motion.nav
				initial="closed"
				animate={openSidebar ? "open" : "closed"}
				// custom={height}
				ref={containerRef}
				className={`left-0 w-[300px] h-fit`}
				style={{
					position: openSidebar ?? hidden ? "absolute" : "fixed",
					top: openSidebar ? `${scrollY.current + 64}px` : "64px",
				}}
				onViewportLeave={() => setOpenSidebar(false)}
			>
				<motion.div
					className={`absolute top-[${scrollY.current}px] right-0 w-[300px] ${
						hidden && !openSidebar
							? "bg-transparent"
							: "bg-white/90 dark:bg-black/95"
					} h-full -z-10 rounded-br-md`}
					variants={sidebar}
				/>
				<Navigation categories={categories} />
				<MenuToggle />
			</motion.nav>
		</SidebarContext.Provider>
	);
}
export const useSidebarContext = () => useContext(SidebarContext);
