import BestSellers from "../components/BestSellers";
import { fetchProducts } from "../util/getData";

export default async function ProductDataProvider() {
  const products = await fetchProducts();

  return <BestSellers products={products} />;
}
