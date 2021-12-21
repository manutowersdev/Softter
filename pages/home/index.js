import React, { useEffect, useState } from "react";
import Softee from "../../components/Softee";
import { getLatestSoftees } from "../../firebase/client";
import useUser from "../../hooks/useUser";
import styles from "../../styles/HomePage.module.css";
import Create from "../../components/Icons/Create";
import Home from "../../components/Icons/Home";
import Search from "../../components/Icons/Search";
import Link from "next/link";
import Head from "next/head";

export default function HomePage() {
  const [Timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(async () => {
    if (user) {
      const softees = await getLatestSoftees();
      setTimeline(softees);
    }
  }, [user]);

  return (
    <>
      {/* <Avatar/> */}
      <Head>
        <title>Inicio / Softter</title>
      </Head>
      <header className={styles.header}>
        <h2 className={styles.h2}>Inicio</h2>
      </header>
      <section className={styles.section}>
        <div className={styles.softeesCont}>
          {Timeline &&
            Timeline.map(
              ({ id, username, avatar, content, userId, createdAt, img }) => {
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
                  />
                );
              }
            )}
        </div>
      </section>
      <nav className={styles.nav}>
        <Link href="/home">
          <a>
            <Home width="28" height="28" />
          </a>
        </Link>
        <Link href="/search">
          <a>
            <Search width="28" height="28" />
          </a>
        </Link>
        <Link href="/compose/softee">
          <a>
            <Create width="28" height="28" />
          </a>
        </Link>
      </nav>
    </>
  );
}
