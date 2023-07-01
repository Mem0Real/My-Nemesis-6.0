import ItemDataContext from "@/context/itemContext";

export default function ItemLayout({ children }) {
  return <ItemDataContext>{children}</ItemDataContext>;
}
