import { EventReducer } from "../../interfaces/EventReducer";
import { GetMessage } from "../actions";
import { Types } from "../actions/types";

const INITIAL_STATE: EventReducer = {
  message: null
};

type Action = GetMessage;

const eventReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case Types.GetMessage:
      return { ...state, message: action.payload.message };
    default:
      return state;
  }
};

export default eventReducer;
