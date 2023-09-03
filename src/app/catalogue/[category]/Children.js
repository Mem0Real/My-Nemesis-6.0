import Slider from "../components/Slider";

export default function Children({ category, parent, childrenData }) {
	return (
		<Slider childrens={childrenData} parent={parent} category={category} />
	);
}
