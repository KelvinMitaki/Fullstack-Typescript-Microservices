import Axios, { AxiosInstance } from "axios";
import { AppContext } from "next/app";

const buildClient = ({ ctx: { req } }: AppContext): AxiosInstance => {
  if (typeof window === "undefined") {
    return Axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req?.headers
    });
  }

  return Axios.create({
    baseURL: "/"
  });
};
export default buildClient;
