import { User } from "./User";

export interface AuthReducer {
  user: User | null;
  registerLoading: boolean;
  registerError: string | null;
  loginError: string | null;
  loading: boolean;
}
