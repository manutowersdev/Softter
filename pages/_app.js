import "../styles/globals.css";

export default function App({ Component, props }) {
  return (
    <main className="content-cont">
      <Component {...props} />
    </main>
  );
}
