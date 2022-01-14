import Footer from "components/Footer";
import Header from "components/Header";
import { ThemeContext } from "hooks/themeContext";
import { useContext, useRef } from "react";
import styles from "styles/Search.module.css";
import Search from "components/Icons/Search";

export default function SearchPage() {
  const { toggle: darkMode } = useContext(ThemeContext);
  const searchInput = useRef();

  function handlePhraseClick(e) {
    searchInput.current.focus();
  }

  return (
    <>
      <Header location="Search" />
      <section
        className={
          darkMode ? `${styles.wrapper} ${styles.darkMode}` : styles.wrapper
        }
      >
        <p
          onClick={handlePhraseClick}
          className={
            darkMode
              ? `${styles.inputPhrase} ${styles.darkMode}`
              : styles.inputPhrase
          }
        >
          Search any technology topic
        </p>
        <div className={styles.inputWrapper}>
          <Search width="28" height="25" />
          <input
            ref={searchInput}
            placeholder="Search Softter"
            className={
              darkMode
                ? `${styles.searchInput} ${styles.darkMode}`
                : styles.searchInput
            }
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
