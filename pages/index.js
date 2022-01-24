import { useEffect } from "react"
import Head from "next/head"
import styles from "styles/Index.module.css"
import Button from "components/Button"
import GitHub from "components/Icons/GitHub"
import { loginWithGitHub } from "../firebase/client"
import Avatar from "components/Avatar"
import Logo from "components/Icons/Logo"
import { useRouter } from "next/router"
import useUser, { USER_STATES } from "hooks/useUser"

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
      console.error(err)
    })
  }

  return (
    <>
      <Head>
        <title>Softter</title>
        <meta name="description" content="Twitter Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={styles.section}>
        <Logo width="100" />
        <h1 className={styles.title}>
          <a href="">Softter</a>
        </h1>
        <h2 className={styles.h2}>From a Junior, to Juniors💻</h2>
        <div>
          {user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleClick}>
              <GitHub width={24} height={24} fill="white" />
              Login with GitHub
            </Button>
          )}
          {user && user.avatar && (
            <div>
              <Avatar
                src={user.avatar}
                alt={user.username}
                text={user.name}
                withText
              />
            </div>
          )}
          {user === USER_STATES.NOT_KNOWN && (
            <img src="loader.gif" alt="icono loading" />
          )}
        </div>
      </section>
    </>
  )
}
