import React, { createContext } from "react";
import styles from "styles/AppLayout.module.css";

export const themeContext = createContext({
  theme: false,
  toggleTheme: () => {},
});

export default function AppLayout({ children }) {
  let wrapperStyle = styles.main;

  if (themeContext.theme) {
    wrapperStyle = `${styles.main} ${styles.black}`;
  }

  return <div className={wrapperStyle}>{children}</div>;
}
