import "../styles/globals.css";
import { AppContext, AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// MyApp.getInitialProps=async(appContext:AppContext)=>{}

export default MyApp;
