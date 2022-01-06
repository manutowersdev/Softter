import "styles/globals.css";
import AppLayout from "components/AppLayout";

export default function App({ Component, pageProps }) {
  return (
    <main className="content-cont">
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </main>
  );
}
