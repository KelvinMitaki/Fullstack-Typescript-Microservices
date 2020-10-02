import "../styles/globals.css";
import App, { AppContext, AppProps } from "next/app";
import React from "react";
import "cropperjs/dist/cropper.css";
import "semantic-ui-css/semantic.min.css";
import { currentUser } from "../redux/actions";
import { wrapper } from "../redux/reducers";
import buildClient from "../api/build-client";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const {
    ctx: { store }
  } = appContext;
  if (store) {
    // @ts-ignore
    store.dispatch(
      // @ts-ignore

      currentUser(appContext)
    );
  }

  return { ...appProps };
};

export default wrapper.withRedux(MyApp);
