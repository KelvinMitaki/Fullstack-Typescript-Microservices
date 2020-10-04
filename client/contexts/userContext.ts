import React from "react";
import { User } from "../interfaces/User";

export interface UserContextProps {
  user: User | null;
}

export const UserContext = React.createContext<UserContextProps>({
  user: null
});
