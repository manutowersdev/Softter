import React, { useContext } from "react"
import { ThemeContext } from "../../hooks/themeContext"
import styles from "styles/ThemeButton.module.css"

export default function ThemeButton() {
  const { toggle, toggleTheme } = useContext(ThemeContext)

  function handleClick(e) {
    e.preventDefault()
    toggleTheme(!toggle)
  }

  return (
    <div
      onClick={handleClick}
      className={
        toggle
          ? `${styles.buttonWrapper} ${styles.right}`
          : styles.buttonWrapper
      }
    >
      <button
        className={toggle ? `${styles.button} ${styles.right}` : styles.button}
      />
    </div>
  )
}
