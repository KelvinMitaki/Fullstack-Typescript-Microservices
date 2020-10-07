import { Subjects } from "./subjects";

export interface UserUpdated {
  subject: Subjects.UserUpdated;
  data: {
    _id: string;
    name: string;
    photos: string[];
  };
}
