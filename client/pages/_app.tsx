import "../styles/globals.css";
import App, { AppContext, AppProps } from "next/app";
import React from "react";
import "cropperjs/dist/cropper.css";
import "semantic-ui-css/semantic.min.css";
import buildClient from "../api/build-client";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const res = await buildClient(appContext).get("/api/user/current_user");
  return { ...appProps, user: res.data.currentUser };
};

export default MyApp;
