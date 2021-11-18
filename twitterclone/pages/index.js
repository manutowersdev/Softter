import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Button from '../components/Button/Button';
import GitHub from '../components/Icons/GitHub';
import {
  loginWithGitHub,
  onAuthStateChangedFunction,
} from '../firebase/client';

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
        <meta name='description' content='Twitter Clone' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <section className={styles.section}>
          <img className={styles.img} src='/logo.jpg' alt='logo tweeter' />
          <h1 className={styles.title}>
            <a href=''>Tweetter</a>
          </h1>
          <h2 className={styles.h2}>From a Junior, to Juniors💻</h2>
          <div>
            {user === null ? (
              <Button onClick={handleClick}>
                <GitHub width={24} height={24} fill='white' />
                Login with GitHub
              </Button>
            ) : (
              <div>
                <img src={user.avatar} />
                <strong>{user.name}</strong>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
