import Axios, { AxiosInstance } from "axios";
import { GetInitialProps } from "../interfaces/GetInitialProps";

export default ({ req }: GetInitialProps): AxiosInstance => {
  if (typeof window === "undefined") {
    return Axios.create({
      baseURL: "http:ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req?.headers
    });
  }

  return Axios.create({
    baseURL: "/"
  });
};
