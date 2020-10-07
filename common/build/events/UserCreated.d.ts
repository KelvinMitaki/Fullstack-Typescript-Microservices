import { Subjects } from "./subjects";
export interface UserCreated {
    subject: Subjects.UserCreated;
    data: {
        _id: string;
        name: string;
        photos: string[];
        version: number;
    };
}
