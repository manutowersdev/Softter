import React from "react";
import Avatar from "../Avatar/Avatar";
import styles from "../../styles/Softee.module.css";
import useTimeAgo from "../../hooks/useTimeAgo";
import Link from "next/link";

export default function Softee({
  avatar,
  username,
  content,
  id,
  createdAt,
  userId,
  img,
}) {
  const timeago = useTimeAgo(createdAt);
  const titleTime = `${new Date(createdAt).toLocaleDateString()} ${new Date(
    createdAt
  ).toLocaleTimeString()}`;

  return (
    <article className={styles.Softee} key={id}>
      <div className={styles.div}>
        <Avatar src={avatar} alt={username} />
      </div>
      <section>
        <strong className={styles.username}>{username}</strong>
        <span> · </span>
        <Link href={`/status/[id]`} as={`/status/${id}`}>
          <time className={styles.date} title={titleTime}>
            {timeago}
          </time>
        </Link>
        <p className={styles.p}>{content}</p>
        {img && <img src={img} className={styles.softeeImg} />}
      </section>
    </article>
  );
}
