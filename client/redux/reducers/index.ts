import { combineReducers } from "redux";
import { StoreState } from "../../interfaces/StoreState";
import authReducer from "./authReducer";
import eventReducer from "./eventReducer";

export default combineReducers<StoreState>({
  auth: authReducer,
  event: eventReducer
});
