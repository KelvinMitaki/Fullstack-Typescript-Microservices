import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
  StoreEnhancer
} from "redux";
import { StoreState } from "../../interfaces/StoreState";
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
    if (state.form) nextState.form = state.form;
    return nextState;
  }
  return combineReducer(state, action);
};

const initStore = (): Store => createStore(reducer, bindMiddleware([thunk]));

const combineReducer = combineReducers<StoreState>({
  form: formReducer
});

export const wrapper = createWrapper(initStore);
