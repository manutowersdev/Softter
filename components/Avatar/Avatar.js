import styles from "../../styles/Avatar.module.css";
import React from "react";

export default function Avatar({ alt, src, text, withText }) {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} src={src} alt={alt} title={alt} />
      {withText && <strong>{text || alt}</strong>}
    </div>
  );
}
