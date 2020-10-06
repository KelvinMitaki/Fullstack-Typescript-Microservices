import { Publisher, Subjects, UserCreated } from "@kmevents/common";

export class UserCreatedPublisher extends Publisher<UserCreated> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}
