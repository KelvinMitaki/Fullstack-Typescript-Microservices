import "../styles/globals.css";
import App, { AppContext, AppProps } from "next/app";
import React from "react";
import "cropperjs/dist/cropper.css";
import "semantic-ui-css/semantic.min.css";
import buildClient from "../api/build-client";
import { User } from "../interfaces/User";
import { wrapper } from "../redux/reducers";

interface Props extends AppProps {
  user: User | null;
}

function MyApp({ Component, pageProps, user }: Props) {
  return <Component {...pageProps} user={user} />;
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const res = await buildClient(appContext).get("/api/user/current_user");
  return { ...appProps, user: res.data.currentUser };
};

export default wrapper.withRedux(MyApp);
