import React from "react";
import Avatar from "../Avatar/Avatar";
import styles from "../../styles/Tweed.module.css";

export default function Tweed({
  avatar,
  username,
  content,
  id,
  createdAt,
  userId,
}) {
  return (
    <article className={styles.tweed} key={id}>
      <div className={styles.div}>
        <Avatar src={avatar} alt={username} />
      </div>
      <section>
        <strong className={styles.username}>{username}</strong>
        <span> · </span>
        <span className={styles.date}>{createdAt}</span>
        <p className={styles.p}>{content}</p>
      </section>
    </article>
  );
}
