import styles from "./styles.module.css";
import "@/app/globals.css";

export default function LoginLayout({ children }) {
  return <section className={styles.style}>{children}</section>;
}
