import { Subjects } from "./subjects";

export interface EventCreated {
  subject: Subjects.EventCreated;
  data: {
    name: string;
    type: string;
    description: string;
    city: string;
    town: string;
    date: string;
    userId: string;
  };
}
