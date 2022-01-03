import React from "react";
import Avatar from "../Avatar/Avatar";
import styles from "../../styles/Softee.module.css";
import useTimeAgo from "../../hooks/useTimeAgo";
import Link from "next/link";
import { useRouter } from "next/router";
import { formatDate } from "../../hooks/helpers";

export default function Softee({
  avatar,
  username,
  content,
  id,
  createdAt,
  userId,
  img,
}) {
  const router = useRouter();
  const timeago = useTimeAgo(createdAt);
  const titleTime = formatDate(createdAt);

  const handleArticleClick = (e) => {
    e.preventDefault();
    router.push(`/status/${id}`);
  };

  return (
    <article onClick={handleArticleClick} className={styles.Softee} key={id}>
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
