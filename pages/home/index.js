import React, { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout/AppLayout";
import Tweed from "../../components/Tweed";
import styles from "../../styles/home.module.css";

export default function HomePage() {
  const [Timeline, setTimeline] = useState([]);

  useEffect(() => {
    fetch("http://192.168.5.103:3001/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline);
  }, []);

  return (
    <AppLayout>
      {/* <Avatar/> */}
      <header className={styles.header}>
        <h2 className={styles.h2}>Inicio</h2>
      </header>
      <section className={styles.section}>
        <div>
          {Timeline &&
            Timeline.map(({ id, username, avatar, message }) => {
              return (
                <Tweed
                  key={id}
                  username={username}
                  avatar={avatar}
                  message={message}
                  id={id}
                />
              );
            })}
        </div>
      </section>
      <nav className={styles.nav}></nav>
    </AppLayout>
  );
}
