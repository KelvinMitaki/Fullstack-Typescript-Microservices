import { AuthReducer } from "./AuthReducer";
import { EventReducer } from "./EventReducer";

export interface StoreState {
  auth: AuthReducer;
  event: EventReducer;
}
