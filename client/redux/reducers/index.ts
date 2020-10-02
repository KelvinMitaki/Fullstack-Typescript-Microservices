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
import { reducer as formReducer } from "redux-form";

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
    if (state.formReducer) nextState.formReducer = state.formReducer;
    return nextState;
  }
  return combineReducer(state, action);
};

const initStore = (): Store => createStore(reducer, bindMiddleware([thunk]));

const combineReducer = combineReducers<StoreState>({
  auth: authReducer,
  event: eventReducer,
  form: formReducer
});

export const wrapper = createWrapper(initStore);
