import Header from "components/Header"
import Softee from "../../components/Softee"
import Head from "next/head"
import Footer from "components/Footer"
import styles from "styles/SingleSoftee.module.css"
import { useContext } from "react"
import { ThemeContext } from "hooks/themeContext"
import router from "next/router"

export default function SofteePage({ data }) {
  const { toggle: darkMode } = useContext(ThemeContext)

  function handleHastagClick(content) {
    router.push("https://softter.vercel.app/search?t1=" + content)
  }

  return (
    <>
      <Head>
        <title>Softee / Softter</title>
      </Head>
      <Header location="Softee" />
      <section
        className={darkMode ? `${styles.body} ${styles.darkMode}` : styles.body}
      >
        <Softee {...data} onClick={true} onHastagClick={handleHastagClick} />
      </section>
      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const { id } = params
  const res = await fetch(`https://softter.vercel.app/api/softees/${id}`)

  if (res.statusText !== "OK") {
    throw new Error("Error fetching the softee data.")
  }

  const props = await res.json()

  return { props: { data: props } }
}
