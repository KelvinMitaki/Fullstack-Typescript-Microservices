import { Subjects } from "./subjects";

export interface UserCreated {
  subject: Subjects.UserCreated;
  data: {
    _id: string;
    name: string;
    profilePhoto: string;
  };
}
