import GoogleAnalytics from "../components/GoogleAnlytics";
import usePageView from "../hooks/usePageView";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  usePageView();

  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
