import React from "react";
import styles from "../../styles/Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link href="/">
            <img className={styles.img} src="/logo.jpg" alt="logo tweeter" />
          </Link>
        </li>
        <li className={styles.li}>☰</li>
      </ul>
    </header>
  );
}
