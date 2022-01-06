import React from "react";
import styles from "styles/Header.module.css";

export default function Header({ location }) {
  return (
    <header className={styles.header}>
      <h2 className={styles.h2}>{location}</h2>
    </header>
  );
}
