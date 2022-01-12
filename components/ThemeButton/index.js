import React, { useContext } from "react";
import { ThemeContext } from "../../hooks/themeContext";
import styles from "styles/ThemeButton.module.css";

export default function ThemeButton() {
  const { toggle, toggleTheme } = useContext(ThemeContext);
  console.log("context", toggle);

  function handleClick(e) {
    e.preventDefault();
    toggleTheme(!toggle);
  }

  return (
    <div onClick={handleClick} className={styles.buttonWrapper}>
      <button className={styles.button}></button>
    </div>
  );
}
