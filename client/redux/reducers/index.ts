import { combineReducers } from "redux";
import { StoreState } from "../../interfaces/StoreState";
import authReducer from "./authReducer";

export default combineReducers<StoreState>({
  auth: authReducer
});
