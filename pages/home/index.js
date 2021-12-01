import React, { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout/AppLayout";
import Tweed from "../../components/Tweed";
import { getLatestTweeds } from "../../firebase/client";
import useUser from "../../hooks/useUser";
import styles from "../../styles/home.module.css";

export default function HomePage() {
  const [Timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(async () => {
    if (user) {
      const tweeds = await getLatestTweeds();
      setTimeline(tweeds);
    }
  }, [user]);

  return (
    <AppLayout>
      {/* <Avatar/> */}
      <header className={styles.header}>
        <h2 className={styles.h2}>Inicio</h2>
      </header>
      <section className={styles.section}>
        <div className={styles.tweedsCont}>
          {Timeline &&
            Timeline.map(
              ({ id, username, avatar, content, userId, createdAt }) => {
                return (
                  <Tweed
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
      <nav className={styles.nav}></nav>
    </AppLayout>
  );
}
