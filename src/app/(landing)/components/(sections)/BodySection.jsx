import { fetchProducts, fetchCategories } from "../../util/getData";

import ShopCategory from "../ShopCategory";
import BestSellers from "../BestSellers";
import Company from "../Company";

import ServiceShow from "../ServiceShow";
import Title from "@/app/while/Title";

export default async function BodySection() {
	const categoryData = fetchCategories();
	const productData = fetchProducts();

	const [categories, products] = await Promise.all([categoryData, productData]);

	return (
		<main className=" bg-neutral-100 dark:bg-neutral-800 backdrop-blur-lg">
			<Company />
			<Title />
			<BestSellers products={products} />
			<ShopCategory categories={categories} />
			<ServiceShow />
		</main>
	);
}
