import React, { useContext, useEffect, useState } from "react"
import Softee from "components/Softee"
import { getLatestSoftees } from "../../firebase/client"
import useUser from "hooks/useUser"
import styles from "styles/HomePage.module.css"
import Head from "next/head"
import Header from "components/Header"
import Footer from "components/Footer"
import { ThemeContext } from "hooks/themeContext"

export default function HomePage() {
  const [Timeline, setTimeline] = useState([])
  const { toggle: darkMode } = useContext(ThemeContext)
  const user = useUser()

  useEffect(async () => {
    if (user) {
      const softees = await getLatestSoftees()
      setTimeline(softees)
    }
  }, [user])

  return (
    <>
      <Head>
        <title>Inicio / Softter</title>
      </Head>
      <Header location="Inicio" />
      <section
        className={
          darkMode ? `${styles.section} ${styles.darkMode}` : styles.section
        }
      >
        <div className={styles.softeesCont}>
          {Timeline &&
            Timeline.map(
              ({
                id,
                username,
                avatar,
                content,
                userId,
                createdAt,
                img,
                hastags,
              }) => {
                return (
                  <Softee
                    img={img}
                    key={id}
                    createdAt={createdAt}
                    username={username}
                    avatar={avatar}
                    content={content}
                    id={id}
                    userId={userId}
                    hastags={hastags}
                  />
                )
              }
            )}
        </div>
      </section>
      <Footer />
    </>
  )
}
