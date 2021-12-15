import React from "react";
import Avatar from "../Avatar/Avatar";
import styles from "../../styles/Tweed.module.css";
import useTimeAgo from "../../hooks/useTimeAgo";

export default function Tweed({
  avatar,
  username,
  content,
  id,
  createdAt,
  userId,
  img,
}) {
  const timeago = useTimeAgo(createdAt);

  return (
    <article className={styles.tweed} key={id}>
      <div className={styles.div}>
        <Avatar src={avatar} alt={username} />
      </div>
      <section>
        <strong className={styles.username}>{username}</strong>
        <span> · </span>
        <span className={styles.date}>{timeago}</span>
        <p className={styles.p}>{content}</p>
        {img && <img src={img} className={styles.tweedImg} />}
      </section>
    </article>
  );
}
