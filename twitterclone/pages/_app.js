import '../styles/globals.css';
import '../styles/var.css';
function MyApp({ Component, pageProps }) {
  return (
    <div className='content-cont'>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
