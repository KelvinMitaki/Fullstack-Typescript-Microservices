import { Types } from "./types";
import Axios from "axios";
import Router from "next/router";
import fetch from "isomorphic-unfetch";
import { Dispatch } from "redux";
import { User } from "../../interfaces/User";
import { RegisterFormValues } from "../../interfaces/Register";
import { LoginFormValues } from "../../interfaces/Login";
import { BasicProfileFormValues } from "../../interfaces/Basics";

const baseURL = process.env.BASE_URL;

export interface GetMessage {
  type: Types.GetMessage;
  payload: { message: string };
}

export const getMessage = () => async (dispatch: Dispatch) => {
  try {
    const res = await Axios.get<GetMessage["payload"]>("/api/test", {
      baseURL
    });
    dispatch<GetMessage>({ type: Types.GetMessage, payload: res.data });
  } catch (error) {
    console.log(error.response);
  }
};

export interface CurrentUser {
  type: Types.CurrentUser;
  payload: User | null;
}

export const currentUser = (headers: RequestInit["headers"]) => async (
  dispatch: Dispatch
) => {
  try {
    const res = await fetch("http://localhost:3000/api/current_user", {
      headers: headers
    });
    const data = await res.json();
    dispatch<CurrentUser>({ type: Types.CurrentUser, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export interface RegisterUser {
  type: Types.RegisterStart | Types.RegisterStop | Types.RegisterError;
  payload?: any;
}

export const registerUser = (formValues: RegisterFormValues) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch<RegisterUser>({ type: Types.RegisterStart });
    await Axios.post("/api/register", formValues, { baseURL });
    Router.push("/login");
    dispatch({ type: Types.RegisterStop });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: Types.RegisterStop });
    dispatch({
      type: Types.RegisterError,
      payload: error.response.data.message
    });
  }
};

export interface LoginUser {
  type: Types.LoadingStart | Types.LoadingStop | Types.LoginError;
  payload?: any;
}

export const loginUser = (formValues: LoginFormValues) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch<LoginUser>({ type: Types.LoadingStart });
    await Axios.post("/api/login", formValues, { baseURL });
    Router.push("/");
    dispatch<LoginUser>({ type: Types.LoadingStop });
  } catch (error) {
    console.log(error.response);
    dispatch<LoginUser>({ type: Types.LoadingStop });
    dispatch<LoginUser>({
      type: Types.LoginError,
      payload: error.response.data.message
    });
  }
};

export interface BasicProfile {
  type: Types.LoadingStart | Types.LoadingStop;
}

export const basicProfile = (formValues: BasicProfileFormValues) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch<BasicProfile>({ type: Types.LoadingStart });
    await Axios.post("/api/update/user", formValues, { baseURL });
    Router.push("/profile");
    dispatch<BasicProfile>({ type: Types.LoadingStop });
  } catch (error) {
    console.log(error.response);
  }
};

export interface LogoutUser {}

export const logoutUser = () => async (dispatch: Dispatch) => {
  try {
    await Axios.post("/api/logout");
    Router.replace("/login");
  } catch (error) {
    console.log(error.response);
  }
};
