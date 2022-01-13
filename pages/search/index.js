import Footer from "components/Footer";
import Header from "components/Header";
import { ThemeContext } from "hooks/themeContext";
import { useContext } from "react";
import styles from "styles/Search.module.css";

export default function Search() {
  const { toggle: darkMode } = useContext(ThemeContext);

  return (
    <>
      <Header location="Search" />
      <section
        className={darkMode ? `${styles.body} ${styles.darkMode}` : styles.body}
      ></section>
      <Footer />
    </>
  );
}
