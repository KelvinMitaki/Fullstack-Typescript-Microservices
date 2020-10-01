import "../styles/globals.css";
import App, { AppContext, AppProps } from "next/app";
import React from "react";
import { currentUser } from "../redux/actions";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  currentUser(appContext);
  return { ...appProps };
};

export default MyApp;
