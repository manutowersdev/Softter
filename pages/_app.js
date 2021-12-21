import "../styles/globals.css";
import AppLayout from "../components/AppLayout/AppLayout";

export default function App({ Component, props }) {
  return (
    <main className="content-cont">
      <AppLayout>
        <Component {...props} />
      </AppLayout>
    </main>
  );
}
