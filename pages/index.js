import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Index.module.css";
import Button from "../components/Button/Button";
import GitHub from "../components/Icons/GitHub";
import {
  loginWithGitHub,
  onAuthStateChangedFunction,
} from "../firebase/client";
import Avatar from "../components/Avatar/Avatar";
import Logo from "../components/Icons/Logo";
import AppLayout from "../components/AppLayout/AppLayout";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChangedFunction(setUser);
  }, []);

  const handleClick = () => {
    loginWithGitHub()
      .then(setUser)
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Head>
        <title>Tweetter</title>
        <meta name="description" content="Twitter Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <section className={styles.section}>
          <Logo width="100" />
          <h1 className={styles.title}>
            <a href="">Tweetter</a>
          </h1>
          <h2 className={styles.h2}>From a Junior, to Juniors💻</h2>
          <div>
            {user === null ? (
              <Button onClick={handleClick}>
                <GitHub width={24} height={24} fill="white" />
                Login with GitHub
              </Button>
            ) : (
              <div>
                <Avatar
                  src={user.avatar}
                  alt={user.username}
                  text={user.name}
                  withText
                />
              </div>
            )}
          </div>
        </section>
      </AppLayout>
    </>
  );
}
