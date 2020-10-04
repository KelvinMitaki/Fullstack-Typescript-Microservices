import "../styles/globals.css";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import React from "react";
import "cropperjs/dist/cropper.css";
import "semantic-ui-css/semantic.min.css";
import buildClient from "../api/build-client";
import { User } from "../interfaces/User";
import { wrapper } from "../redux/reducers";
import { UserContext } from "../contexts/userContext";

interface Props extends AppProps {
  user: User | null;
}

function MyApp({ Component, pageProps, user }: Props) {
  return (
    <UserContext.Provider value={{ user }}>
      <Component {...pageProps} user={user} />;
    </UserContext.Provider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const res = await buildClient(appContext.ctx).get("/api/user/current_user");
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps, user: res.data.currentUser };
};

export default wrapper.withRedux(MyApp);
