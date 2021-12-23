import GoogleAnalytics from "../components/GoogleAnlytics";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
