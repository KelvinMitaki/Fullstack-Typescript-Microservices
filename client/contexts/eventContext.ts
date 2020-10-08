import React from "react";
import { Event } from "../interfaces/Event";
interface EventCtx {
  event: Event | null;
}
export const EventContext = React.createContext<EventCtx>({
  event: null
});
