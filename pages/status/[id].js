import Header from "components/Header";
import Softee from "../../components/Softee";
import Head from "next/head";
import Footer from "components/Footer";

export default function SofteePage({ data }) {
  return (
    <>
      <Head>
        <title>Softee / Softter</title>
      </Head>
      <Header location="Softee" />
      <Softee {...data} />
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const res = await fetch(`http://192.168.5.130:3000/api/softees/${id}`);

  if (res.statusText !== "OK") {
    throw new Error("Error fetching the softee data.");
  }

  const props = await res.json();

  return { props: { data: props } };
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
//   const res = await fetch(`http://192.168.5.130:3000/api/softees/${id}`);

//   if (res.statusText !== 'OK') {
//     throw new Error('Error fetching the softee data.');
//   }

//   const props = await res.json();

//   return { props: { data: props } };
// }
