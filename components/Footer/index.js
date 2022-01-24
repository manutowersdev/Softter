import React, { useContext } from "react"
import Link from "next/link"
import Home from "components/Icons/Home"
import Search from "components/Icons/Search"
import Create from "components/Icons/Create"
import styles from "styles/Footer.module.css"
import { ThemeContext } from "../../hooks/themeContext"

export default function Footer() {
  const { toggle: darkMode } = useContext(ThemeContext)

  return (
    <nav
      className={darkMode ? `${styles.footer} ${styles.dark}` : styles.footer}
    >
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
  )
}
