import { User } from "./User";

export interface LayoutInterFace {
  children: React.ReactNode;
  title: string;
  user?: User | null;
}
