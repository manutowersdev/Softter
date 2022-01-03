import Softee from "../../components/Softee";

export default function SofteePage({ data }) {
  return (
    <>
      <Softee {...data} />
    </>
  );
}

export async function getServerSideProps(context) {
  // params, req, res, query
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
