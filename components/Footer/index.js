import React from "react";
import Link from "next/link";
import Home from "components/Icons/Home";
import Search from "components/Icons/Search";
import Create from "components/Icons/Create";
import styles from "styles/Footer.module.css";

export default function Footer() {
  return (
    <nav className={styles.footer}>
      <Link href="/home">
        <a>
          <Home width="28" height="28" />
        </a>
      </Link>
      <Link href="/search">
        <a>
          <Search width="28" height="28" />
        </a>
      </Link>
      <Link href="/compose/softee">
        <a>
          <Create width="28" height="28" />
        </a>
      </Link>
    </nav>
  );
}
