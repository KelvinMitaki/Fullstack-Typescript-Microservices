import { User } from "./User";

export interface Layout {
  children: React.ReactNode;
  title: string;
  user: User | null;
}
