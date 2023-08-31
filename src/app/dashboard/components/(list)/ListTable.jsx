import React, {
	useState,
	useEffect,
	createContext,
	useContext,
	Suspense,
} from "react";

import { useDataContext } from "./List";
import Category from "./listData/Category";

import { setCookie, getCookie, hasCookie } from "cookies-next";

import Fuse from "fuse.js";

import { useIcons } from "@/app/utils/CustomIcons";

const TableContext = createContext({});

// TODO make dropdowns show multiple when searched
export default function MyTable() {
	const { data } = useDataContext();

	const [categoryData, setCategoryData] = useState(data[0]);
	const [parentData, setParentData] = useState(data[1]);
	const [childData, setChildData] = useState(data[2]);
	const [productData, setProductData] = useState(data[3]);
	const [searchValue, setSearchValue] = useState();

	const [cat, setCat] = useState({});
	const [par, setPar] = useState({});
	const [chi, setChi] = useState({});

	const { SearchIcon, CloseIcon } = useIcons();

	useEffect(() => {
		data[0] !== categoryData && setCategoryData(data[0]);
		data[1] !== parentData && setParentData(data[1]);
		data[2] !== childData && setChildData(data[2]);
		data[3] !== productData && setProductData(data[3]);
	}, [data]);

	useEffect(() => {
		let category, parent, child;
		if (hasCookie("Category_Drop")) {
			category = JSON.parse(getCookie("Category_Drop"));
			setCat(category);
		} else setCat({ id: false, open: false });

		if (hasCookie("Parent_Drop")) {
			parent = JSON.parse(getCookie("Parent_Drop"));
			setPar(parent);
		} else setPar({ id: false, open: false });

		if (hasCookie("Child_Drop")) {
			child = JSON.parse(getCookie("Child_Drop"));
			setChi(child);
		} else setChi({ id: false, open: false });
	}, []);

	useEffect(() => {
		setCookie("Category_Drop", cat);
		setCookie("Parent_Drop", par);
		setCookie("Child_Drop", chi);
	}, [cat, par, chi]);

	const handleChange = (e, clear = null) => {
		if (e.target.value) setSearchValue(e.target.value);
		else {
			setSearchValue();
			setCategoryData(data[0]);
			setParentData(data[1]);
			setChildData(data[2]);
			setProductData(data[3]);
		}

		if (clear) {
			setSearchValue();
			setCategoryData(data[0]);
			setParentData(data[1]);
			setChildData(data[2]);
			setProductData(data[3]);
		} else {
			const text = e.target.value;

			handleFilter(text);
		}
	};

	const handleFilter = (searchTerm) => {
		const [categoryResults, parentResults, childResults, productResults] =
			searchData(searchTerm);

		let categoryTree, parentTree, childTree, itemTree;

		if (categoryResults.length > 0) {
			categoryTree = getTree("category", categoryResults);
			setCat({ id: categoryResults[0].item.id, open: true });
		} else if (parentResults.length > 0) {
			parentTree = getTree("parent", parentResults);
			setCat({ id: parentResults[0].item.CategoryId, open: true });
		} else if (childResults.length > 0) {
			childTree = getTree("child", childResults);
			setCat({ id: childResults[0].item.CategoryId, open: true });
			setPar({ id: childResults[0].item.ParentId, open: true });
		} else if (productResults.length > 0) {
			itemTree = getTree("item", productResults);
			setCat({ id: productResults[0].item.CategoryId, open: true });
			setPar({ id: productResults[0].item.ParentId, open: true });
		} else {
			setCat({ id: "", open: false });
			setPar({ id: "", open: false });
			setChi({ id: "", open: false });
		}
	};

	const searchData = (searchTerm) => {
		let categoryFuse, parentFuse, childFuse, itemFuse;

		const options = {
			keys: ["name"],
			threshold: 0.2,
		};

		categoryFuse = new Fuse(data[0], options);
		parentFuse = new Fuse(data[1], options);
		childFuse = new Fuse(data[2], options);
		itemFuse = new Fuse(data[3], options);

		const res1 = categoryFuse.search(searchTerm);
		const res2 = parentFuse.search(searchTerm);
		const res3 = childFuse.search(searchTerm);
		const res4 = itemFuse.search(searchTerm);

		return [res1, res2, res3, res4];
	};

	const getTree = (entry, results) => {
		let categoryArray = [];
		let parentArray = [];
		let childArray = [];
		let productArray = [];

		if (entry === "category") {
			results.map(({ item }) => {
				categoryArray.push(item);

				let filter1 = data[1].filter((parent) => parent.CategoryId === item.id);
				parentArray.push(filter1);

				let filter2 = data[2].filter((child) => child.CategoryId === item.id);
				childArray.push(filter2);

				let filter3 = data[3].filter(
					(product) => product.CategoryId === item.id
				);
				productArray.push(filter3);
			});

			// Merge the array of arrays
			parentArray = [].concat(...parentArray);
			childArray = [].concat(...childArray);
			productArray = [].concat(...productArray);

			setCategoryData(categoryArray);
			setParentData(parentArray);
			setChildData(childArray);
			setProductData(productArray);
		} else if (entry === "parent") {
			results.map(({ item }) => {
				parentArray.push(item);

				let filter0 = data[0].filter(
					(category) => category.id === item.CategoryId
				);

				filter0.map((fil) => {
					if (!categoryArray.some((category) => category.id === fil.id)) {
						categoryArray.push(fil);
					}
				});

				let filter2 = data[2].filter((child) => child.ParentId === item.id);

				filter2.map((fil) => {
					if (!childArray.some((child) => child.id === fil.id)) {
						childArray.push(fil);
					}
				});

				let filter3 = data[3].filter((product) => product.ParentId === item.id);

				filter3.map((fil) => {
					if (!productArray.some((product) => product.id === fil.id)) {
						productArray.push(fil);
					}
				});
			});

			setCategoryData(categoryArray);
			setParentData(parentArray);
			setChildData(childArray);
			setProductData(productArray);
		} else if (entry === "child") {
			results.map(({ item }) => {
				childArray.push(item);

				let filter0 = data[0].filter(
					(category) => category.id === item.CategoryId
				);

				filter0.map((fil) => {
					if (!categoryArray.some((category) => category.id === fil.id)) {
						categoryArray.push(fil);
					}
				});

				let filter1 = data[1].filter((parent) => parent.id === item.ParentId);

				filter1.map((fil) => {
					if (!parentArray.some((parent) => parent.id === fil.id)) {
						parentArray.push(fil);
					}
				});

				let filter3 = data[3].filter((product) => product.ChildId === item.id);

				filter3.map((fil) => {
					if (!productArray.some((product) => product.id === fil.id)) {
						productArray.push(fil);
					}
				});
			});

			setCategoryData(categoryArray);
			setParentData(parentArray);
			setChildData(childArray);
			setProductData(productArray);
		} else if (entry === "item") {
			results.map(({ item }) => {
				productArray.push(item);

				let filter0 = data[0].filter(
					(category) => category.id === item.CategoryId
				);

				filter0.map((fil) => {
					if (!categoryArray.some((category) => category.id === fil.id)) {
						categoryArray.push(fil);
					}
				});

				let filter1 = data[1].filter((parent) => parent.id === item.ParentId);

				filter1.map((fil) => {
					if (!parentArray.some((parent) => parent.id === fil.id)) {
						parentArray.push(fil);
					}
				});

				let filter2 = data[2].filter((child) => child.id === item.ChildId);

				filter2.map((fil) => {
					if (!childArray.some((child) => child.id === fil.id)) {
						childArray.push(fil);
					}
				});
			});

			setCategoryData(categoryArray);
			setParentData(parentArray);
			setChildData(childArray);
			setProductData(productArray);
		}
	};

	const catDropDown = (categoryId) => {
		if (!cat.id) {
			setCat({ id: categoryId, open: true });
		} else {
			if (cat.id === categoryId) {
				setCat({ ...cat, open: !cat.open });
				if (cat.open === true) {
					setPar({ ...par, open: false });
					setChi({ ...chi, open: false });
				}
			} else {
				setCat({ id: cat.id, open: false });
				setPar({ ...par, open: false });
				setChi({ ...chi, open: false });
				setCat({ id: categoryId, open: true });
			}
		}
	};

	const parDropDown = (parentId) => {
		!par.id
			? setPar({ id: parentId, open: true })
			: par.id === parentId && setPar({ ...par, open: !par.open });

		if (!par.id) {
			setPar({ id: parentId, open: true });
		} else {
			if (par.id === parentId) {
				setPar({ ...par, open: !par.open });
				if (par.open === true) {
					setChi({ ...chi, open: false });
				}
			} else {
				setPar({ id: par.id, open: false });
				setChi({ ...chi, open: false });
				setPar({ id: parentId, open: true });
			}
		}
	};

	const childDropDown = (childId) => {
		!chi.id
			? setChi({ id: childId, open: true })
			: chi.id === childId && setChi({ ...chi, open: !chi.open });

		if (!chi.id) {
			setChi({ id: childId, open: true });
		} else {
			if (chi.id === childId) {
				setChi({ ...chi, open: !chi.open });
			} else {
				setChi({ id: chi.id, open: false });
				setChi({ id: childId, open: true });
			}
		}
	};

	const toggleCatDrop = (id) => {
		catDropDown(id);
	};

	const toggleParDrop = (id) => {
		parDropDown(id);
	};

	const toggleChiDrop = (id) => {
		childDropDown(id);
	};

	const buttonVariants = {
		open: {
			rotate: 90,
			x: 0.5,
			y: 0.5,
		},
		close: {
			rotate: 0,
			x: 0,
			y: 0,
		},
	};
	const dropVariants = {
		opened: {
			transition: {
				staggerChildren: 0.05,
				staggerDirection: 1,
			},
		},
		closed: {
			transition: {
				staggerChildren: 0.05,
				staggerDirection: -1,
			},
		},
	};
	const contentVariants = {
		open: {
			opacity: 1,
			y: "0px",
			transition: {
				duration: 0.2,
				ease: "linear",
			},
		},
		close: {
			opacity: 0,
			y: "-25px",
			transition: {
				duration: 0.2,
				ease: "linear",
			},
		},
	};
	return (
		<TableContext.Provider
			value={{
				catDropDown,
				parDropDown,
				childDropDown,
				cat,
				par,
				chi,
				setCat,
				setPar,
				setChi,
				toggleCatDrop,
				toggleParDrop,
				toggleChiDrop,
				buttonVariants,
				dropVariants,
				contentVariants,
				parentData,
				childData,
				productData,
			}}
		>
			<div className="table-container">
				<div className="mx-auto w-[98%] overflow-auto">
					<div className="flex flex-col items-center md:items-start w-full">
						<input
							type="text"
							onChange={(e) => handleChange(e)}
							placeholder="Search..."
							value={searchValue || ""}
							className="ms-5 ps-7 w-52 flex-initial flex items-center justify-evenly py-2 rounded-sm border-b border-neutral-800 text-neutral-900  dark:border-neutral-200 dark:text-neutral-100 bg-neutral-100/20 dark:bg-neutral-800/20 backdrop-blur-sm border-offset-4 rounded-t-md placeholder:text-neutral-800 dark:placeholder:text-neutral-200"
						/>
						<div className="relative w-52 py-4">
							<div className="text-base absolute left-4 md:left-6 -top-7 grid place-content-start z-10 text-neutral-600 dark:text-neutral-400">
								{SearchIcon}
							</div>
							<div
								className="absolute right-0 md:-right-[17px] -top-8 grid place-content-start z-10 text-neutral-600 dark:text-neutral-400 cursor-pointer"
								onClick={(e) => handleChange(e, "clear")}
							>
								{CloseIcon}
							</div>
						</div>
					</div>
					<table className="table-fixed w-full text-sm">
						<thead className="border-b border-black dark:border-white">
							<tr className="">
								<th className="text-center md:text-start py-5 w-56 md:w-72 lg:w-96">
									Name
								</th>
								<th className="text-center md:text-start py-5 w-80 md:w-80 lg:w-96">
									Description
								</th>
								<th className="w-20 md:w-24 lg:w-36" />
							</tr>
						</thead>
						<tbody>
							<Suspense
								fallback={
									<h1 className="text-4xl text-neutral-800 dark:text-neutral-200 mx-auto">
										Loading...
									</h1>
								}
							>
								{categoryData.length > 0 ? (
									categoryData.map((category, index) => (
										<React.Fragment key={category.id}>
											<Category category={category} index={index} />
										</React.Fragment>
									))
								) : (
									<tr>
										<td colSpan={3} rowSpan={3} align="center">
											<h1 className="py-12 text-2xl text-neutral-800 dark:text-neutral-200 mx-auto">
												Not found
											</h1>
										</td>
									</tr>
								)}
							</Suspense>
						</tbody>
					</table>
				</div>
			</div>
		</TableContext.Provider>
	);
}

export const useTableContext = () => useContext(TableContext);
