import React from "react";
import { Container, Menu, Button } from "semantic-ui-react";
import Head from "next/head";
import Router from "next/router";
import nProgress from "nprogress";
import SignedInMenu from "./SignedInMenu";
import { connect } from "react-redux";

Router.onRouteChangeStart = () => {
  nProgress.start();
};
Router.onRouteChangeComplete = () => nProgress.done();
Router.onRouteChangeError = () => nProgress.done();
const Layout = ({ children, title, user }) => {
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
          {user && user.isLoggedIn && (
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
            {user && user.isLoggedIn ? (
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
const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};
export default connect(mapStateToProps)(Layout);
