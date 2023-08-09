import Image from "next/image";
import logo from "../../../public/images/N.svg";

export default function Loader() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <Image src={logo} alt="Loading" />
    </div>
  );
}
