import Header from "components/Header"
import Softee from "../../components/Softee"
import Head from "next/head"
import Footer from "components/Footer"
import styles from "styles/SingleSoftee.module.css"
import { useContext } from "react"
import { ThemeContext } from "hooks/themeContext"

export default function SofteePage({ data }) {
  const { toggle: darkMode } = useContext(ThemeContext)
  return (
    <>
      <Head>
        <title>Softee / Softter</title>
      </Head>
      <Header location="Softee" />
      <section
        className={darkMode ? `${styles.body} ${styles.darkMode}` : styles.body}
      >
        <Softee {...data} />
      </section>
      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const { id } = params
  const res = await fetch(`http://192.168.5.139:3000/api/softees/${id}`)

  if (res.statusText !== "OK") {
    throw new Error("Error fetching the softee data.")
  }

  const props = await res.json()

  return { props: { data: props } }
}

// export async function getStaticPaths() {
//   return {
//     paths: [{
//       params: { id: 'UVRwyWOQSjSbHygrIxcD'}
//     }],
//     fallback: false
//   }
// }

// export async function getStaticProps(context) {
//   const { params } = context;
//   const { id } = params;
//   const res = await fetch(`http://192.168.5.139:3000/api/softees/${id}`);

//   if (res.statusText !== 'OK') {
//     throw new Error('Error fetching the softee data.');
//   }

//   const props = await res.json();

//   return { props: { data: props } };
// }
