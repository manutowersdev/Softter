import React from "react";
import styles from "styles/AppLayout.module.css";

export default function AppLayout({ children }) {
  return <div className={styles.main}>{children}</div>;
}
