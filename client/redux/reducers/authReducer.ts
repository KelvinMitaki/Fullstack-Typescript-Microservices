import { AuthReducer } from "../../interfaces/AuthReducer";
import { CurrentUser, LoginUser, RegisterUser } from "../actions";
import { Types } from "../actions/types";

const INITIAL_STATE: AuthReducer = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginError: null,
  loading: false
};

type Action = CurrentUser | RegisterUser | LoginUser;
const authReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case Types.CurrentUser:
      return { ...state, user: action.payload };
    case Types.RegisterStart:
      return { ...state, registerLoading: true, registerError: null };
    case Types.RegisterStop:
      return { ...state, registerLoading: false };
    case Types.RegisterError:
      return { ...state, registerError: action.payload };
    case Types.LoadingStart:
      return { ...state, loading: true, loginError: null };
    case Types.LoadingStop:
      return { ...state, loading: false };
    case Types.LoginError:
      return { ...state, loginError: action.payload };
    default:
      return state;
  }
};
export default authReducer;
