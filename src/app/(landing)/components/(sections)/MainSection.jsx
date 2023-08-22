import BodySection from "./BodySection";
import { fetchProducts, fetchCategories } from "../../util/getData";

export default async function MainSection() {
  const categoryData = fetchCategories();
  const productData = fetchProducts();

  const [categories, products] = await Promise.all([categoryData, productData]);

  return (
    <>
      <BodySection categories={categories} products={products} />
    </>
  );
}
