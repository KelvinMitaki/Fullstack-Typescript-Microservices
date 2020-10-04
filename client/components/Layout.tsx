import React, { useContext } from "react";
import { Container, Menu, Button } from "semantic-ui-react";
import Head from "next/head";
import Router from "next/router";
import nProgress from "nprogress";
import SignedInMenu from "./SignedInMenu";
import { LayoutInterFace } from "../interfaces/Layout";
import { UserContext } from "../contexts/userContext";

(Router as any).onRouteChangeStart = () => {
  nProgress.start();
};
(Router as any).onRouteChangeComplete = () => nProgress.done();
(Router as any).onRouteChangeError = () => nProgress.done();

const Layout = ({ children, title }: LayoutInterFace) => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <Menu stackable inverted fixed="top">
        <Container>
          {/* <Menu.Item as="a" to="/" exact="true" header>
            <img src="/assets/logo.png" alt="logo" />
            events
          </Menu.Item> */}
          <Menu.Item
            as="a"
            onClick={() => Router.push("/")}
            exact="true"
            name="Events"
          />
          {user && user.email && (
            <React.Fragment>
              <Menu.Item
                as="a"
                onClick={() => Router.push("/profile")}
                exact="true"
                name="Profile"
              />
              <Menu.Item>
                <Button
                  as="a"
                  floated="right"
                  positive
                  inverted
                  content="Create Event"
                  onClick={() => Router.push("/new/event")}
                />
              </Menu.Item>
            </React.Fragment>
          )}

          <Menu.Item position="right">
            {user && user.email ? (
              <SignedInMenu user={user} />
            ) : (
              <React.Fragment>
                <Button
                  basic
                  inverted
                  content="Login"
                  onClick={() => Router.push("/login")}
                />
                <Button
                  basic
                  inverted
                  content="Register"
                  onClick={() => Router.push("/register")}
                  style={{ marginLeft: "0.5em" }}
                />
              </React.Fragment>
            )}
          </Menu.Item>
        </Container>
      </Menu>

      <Container>{children}</Container>
    </React.Fragment>
  );
};
export default Layout;
