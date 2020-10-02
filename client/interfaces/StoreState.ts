import { AuthReducer } from "./AuthReducer";
import { EventReducer } from "./EventReducer";
import { FormStateMap } from "redux-form";

export interface StoreState {
  auth: AuthReducer;
  event: EventReducer;
  form: FormStateMap;
}
