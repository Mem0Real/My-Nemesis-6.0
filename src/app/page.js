import Header from "./(landing)/Header";
import BestSellers from "./(landing)/BestSellers";
import { fetchProducts } from "./(landing)/getData";

export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className="relative bg-neutral-200 dark:bg-neutral-800">
      <Header />
      <BestSellers products={products} />
      <div className="w-full">
        <div className="flex flex-col gap-12 items-center justify-center">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet.
            Mauris vitae ultricies leo integer malesuada nunc vel risus. Tellus
            in hac habitasse platea dictumst vestibulum rhoncus est. Dignissim
            convallis aenean et tortor at risus viverra adipiscing.{" "}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet.
            Mauris vitae ultricies leo integer malesuada nunc vel risus. Tellus
            in hac habitasse platea dictumst vestibulum rhoncus est. Dignissim
            convallis aenean et tortor at risus viverra adipiscing.{" "}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet.
            Mauris vitae ultricies leo integer malesuada nunc vel risus. Tellus
            in hac habitasse platea dictumst vestibulum rhoncus est. Dignissim
            convallis aenean et tortor at risus viverra adipiscing.{" "}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet.
            Mauris vitae ultricies leo integer malesuada nunc vel risus. Tellus
            in hac habitasse platea dictumst vestibulum rhoncus est. Dignissim
            convallis aenean et tortor at risus viverra adipiscing.{" "}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet.
            Mauris vitae ultricies leo integer malesuada nunc vel risus. Tellus
            in hac habitasse platea dictumst vestibulum rhoncus est. Dignissim
            convallis aenean et tortor at risus viverra adipiscing.{" "}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet.
            Mauris vitae ultricies leo integer malesuada nunc vel risus. Tellus
            in hac habitasse platea dictumst vestibulum rhoncus est. Dignissim
            convallis aenean et tortor at risus viverra adipiscing.{" "}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet.
            Mauris vitae ultricies leo integer malesuada nunc vel risus. Tellus
            in hac habitasse platea dictumst vestibulum rhoncus est. Dignissim
            convallis aenean et tortor at risus viverra adipiscing.{" "}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet.
            Mauris vitae ultricies leo integer malesuada nunc vel risus. Tellus
            in hac habitasse platea dictumst vestibulum rhoncus est. Dignissim
            convallis aenean et tortor at risus viverra adipiscing.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
