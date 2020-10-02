import { NextPageContext } from "next";
import { Store } from "redux";

export interface GetInitialProps extends NextPageContext {
  store: Store;
}
