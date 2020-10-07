import { Subjects } from "./subjects";

export interface EventUpdated {
  subject: Subjects.EventUpdated;
  data: {
    name: string;
    type: string;
    description: string;
    city: string;
    town: string;
    date: string;
    userId: string;
    version: number;
  };
}
