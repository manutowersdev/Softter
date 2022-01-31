import React, { useContext } from "react"
import Avatar from "components/Avatar"
import styles from "styles/Softee.module.css"
import useTimeAgo from "hooks/useTimeAgo"
import Link from "next/link"
import { useRouter } from "next/router"
import { formatDate } from "hooks/helpers"
import { ThemeContext } from "hooks/themeContext"
import Hastag from "components/Hastag"

export default function Softee({
  avatar,
  username,
  content,
  id,
  createdAt,
  userId,
  img,
  hastags,
  onClick,
  onHastagClick,
}) {
  const router = useRouter()
  const timeago = useTimeAgo(createdAt)
  const titleTime = formatDate(createdAt)
  const { toggle: darkMode } = useContext(ThemeContext)

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <article
      onClick={onClick ? handleArticleClick : null}
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
        {onClick ? (
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
        ) : (
          <time
            className={
              darkMode ? `${styles.date} ${styles.darkMode}` : styles.date
            }
            title={titleTime}
          >
            {timeago}
          </time>
        )}
        <div className={styles.p}>
          {content}
          <div className={styles.hastagsWrapper}>
            {hastags
              ?.filter((content) => content?.length > 0)
              .map((content) => {
                return (
                  <Hastag
                    key={`${content}${id}`}
                    content={content}
                    id={id}
                    darkMode={darkMode}
                    onClick={onHastagClick}
                  />
                )
              })}
          </div>
        </div>
        {img && <img src={img} className={styles.softeeImg} />}
      </section>
    </article>
  )
}
