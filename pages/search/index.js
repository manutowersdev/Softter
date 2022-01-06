import Footer from "components/Footer";
import Header from "components/Header";
import styles from "styles/Search.module.css";

export default function Search() {
  return (
    <>
      <Header location="Search" />
      <section className={styles.body}></section>
      <Footer />
    </>
  );
}
