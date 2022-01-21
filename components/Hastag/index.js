import React from "react"
import styles from "styles/Hastag.module.css"
/**
 * Hastag Component
 * @param {string} content
 * @param {number} id
 * @param {boolean} darkMode
 * @returns
 */
export default function Hastag({ content, id, darkMode, onClick }) {
  return (
    <p
      className={
        darkMode ? `${styles.hastag} ${styles.darkMode}` : styles.hastag
      }
      onClick={() => onClick(content)}
    >
      #{content}
    </p>
  )
}
