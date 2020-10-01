import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
  StoreEnhancer
} from "redux";
import { StoreState } from "../../interfaces/StoreState";
import authReducer from "./authReducer";
import eventReducer from "./eventReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

const bindMiddleware = (middleware: ThunkMiddleware[]): StoreEnhancer => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload
    };
    return nextState;
  }
  return combineReducer(state, action);
};

const initStore = (): Store => createStore(reducer, bindMiddleware([thunk]));

const combineReducer = combineReducers<StoreState>({
  auth: authReducer,
  event: eventReducer
});

export const wrapper = createWrapper(initStore);
