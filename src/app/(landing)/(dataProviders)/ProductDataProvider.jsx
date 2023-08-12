import BestSellers from "../BestSellers";
import { fetchProducts } from "../getData";

export default async function ProductDataProvider() {
  const products = await fetchProducts();

  return <BestSellers products={products} />;
}
