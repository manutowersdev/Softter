import React, { useContext } from "react";
import Avatar from "components/Avatar";
import styles from "styles/Softee.module.css";
import useTimeAgo from "hooks/useTimeAgo";
import Link from "next/link";
import { useRouter } from "next/router";
import { formatDate } from "hooks/helpers";
import { ThemeContext } from "hooks/themeContext";

export default function Softee({
  avatar,
  username,
  content,
  id,
  createdAt,
  userId,
  img,
  hastags,
}) {
  const router = useRouter();
  const timeago = useTimeAgo(createdAt);
  const titleTime = formatDate(createdAt);
  const { toggle: darkMode } = useContext(ThemeContext);

  const handleArticleClick = (e) => {
    e.preventDefault();
    router.push(`/status/${id}`);
  };

  return (
    <article
      onClick={handleArticleClick}
      className={
        darkMode ? `${styles.Softee} ${styles.darkMode}` : styles.Softee
      }
      key={id}
    >
      <div className={styles.div}>
        <Avatar src={avatar} alt={username} />
      </div>
      <section>
        <strong className={styles.username}>{username}</strong>
        <span> · </span>
        <Link href={`/status/${id}`}>
          <time
            className={
              darkMode ? `${styles.date} ${styles.darkMode}` : styles.date
            }
            title={titleTime}
          >
            {timeago}
          </time>
        </Link>
        <p className={styles.p}>
          {content}
          <div className={styles.hastagsWrapper}>
            {hastags
              ?.filter((content) => content.length > 0)
              .map((content) => {
                return (
                  <p
                    key={`${content}${id}`}
                    className={
                      darkMode
                        ? `${styles.hastag} ${styles.darkMode}`
                        : styles.hastag
                    }
                  >
                    #{content}
                  </p>
                );
              })}
          </div>
        </p>
        {img && <img src={img} className={styles.softeeImg} />}
      </section>
    </article>
  );
}
