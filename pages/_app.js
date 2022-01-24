import "styles/globals.css"
import AppLayout from "components/AppLayout"
import { ThemeProvider } from "../hooks/themeContext"

export default function App({ Component, pageProps }) {
  return (
    <main className="content-wrapper">
      <ThemeProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    </main>
  )
}
