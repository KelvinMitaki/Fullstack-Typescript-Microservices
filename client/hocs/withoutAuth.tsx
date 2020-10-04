import React, { useContext } from "react";
import Router from "next/router";
import { NextPageContext } from "next";
import { UserContext } from "../contexts/userContext";

const withoutAuth = (WrappedComponent: any) => {
  const WithConditionalRedirectWrapper = (props: any): JSX.Element => {
    const { user } = useContext(UserContext);
    if (typeof window !== "undefined" && user) {
      Router.back();
      return <></>;
    }
    return <WrappedComponent {...props} />;
  };

  WithConditionalRedirectWrapper.getInitialProps = async (
    ctx: NextPageContext
  ) => {
    if (typeof window === "undefined" && ctx.req?.headers.cookie && ctx.res) {
      ctx.res.writeHead(302, { Location: "/" });
      ctx.res.end();
    }
    let componentProps = {};
    if (WrappedComponent.getInitialProps) {
      componentProps = await WrappedComponent.getInitialProps(ctx);
    }
    return { ...componentProps };
  };
  return WithConditionalRedirectWrapper;
};

export default withoutAuth;
