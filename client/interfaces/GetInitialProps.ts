import { NextPageContext } from "next";
import { StoreState } from "./StoreState";

export interface GetInitialProps extends NextPageContext {
  store: Store;
}

interface Store {
  getState(): StoreState;
}
