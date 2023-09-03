import Link from "next/link";
import Image from "next/image";

import Slider from "./components/Slider";

export default async function Parents({ category, parents }) {
	return <Slider parents={parents} category={category} />;
}
