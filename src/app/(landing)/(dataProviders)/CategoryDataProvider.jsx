import ShopCategory from "../ShopCategory";
import { fetchCategories } from "../getData";

export default async function CategoryDataProvider() {
  const categories = await fetchCategories();

  return <ShopCategory categories={categories} />;
}
