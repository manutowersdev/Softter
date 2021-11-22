import React from "react";
import Avatar from "../Avatar/Avatar";
import styles from "../../styles/Tweed.module.css";

export default function Tweed({ avatar, username, message, id }) {
  return (
    <article className={styles.tweed} key={id}>
      <div className={styles.div}>
        <Avatar src={avatar} alt={username} />
      </div>
      <section>
        <strong className={styles.username}>{username}</strong>
        <p className={styles.p}>{message}</p>
      </section>
    </article>
  );
}
